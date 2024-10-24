import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PositionRequestStatus } from '@prisma/client';
import { Cache } from 'cache-manager';
import { getALStatus } from 'common-kit';
import dayjs from 'dayjs';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

export enum ScheduledTask {
  CrmSync = 'crm-sync',
  PeoplesoftSync = 'peoplesoft-sync',
  UserSync = 'user-sync',
}

@Injectable()
export class ScheduledTaskService {
  private readonly logger = new Logger(ScheduledTaskService.name);

  constructor(
    private readonly crmService: CrmService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async isMetadataOutdated(task: ScheduledTask) {
    const metadata = await this.prisma.scheduledTaskMetadata.findUnique({
      where: { task },
    });
    if (metadata == null || metadata.last_run_at == null) return true;

    const lastRunAt = dayjs(metadata.last_run_at).set('ms', 0);
    const now = dayjs().set('ms', 0);
    const diff = Math.abs(lastRunAt.diff(now, 's'));

    return diff >= metadata.frequency;
  }

  private async updateMetadata(task: ScheduledTask, frequency: number) {
    const now = dayjs().set('ms', 0);

    await this.prisma.scheduledTaskMetadata.upsert({
      where: { task },
      create: {
        task,
        frequency,
        last_run_at: now.toDate(),
      },
      update: {
        last_run_at: now.toDate(),
      },
    });
  }

  @Cron('*/5 * * * * *')
  async syncPeoplesoftData() {
    if (process.env.E2E_TESTING === 'true') {
      return;
    }
    const needsUpdate = await this.isMetadataOutdated(ScheduledTask.PeoplesoftSync);

    if (needsUpdate === true) {
      await this.updateMetadata(ScheduledTask.PeoplesoftSync, 86400);
      await this.peoplesoftService.syncClassifications();
      await this.peoplesoftService.syncLocations();
      await this.peoplesoftService.syncOrganizationsAndDepartments();
    }
  }

  @Cron('*/5 * * * * *')
  async syncPositionStatuses() {
    const needsUpdate = await this.isMetadataOutdated(ScheduledTask.CrmSync);

    if (needsUpdate === true) {
      await this.updateMetadata(ScheduledTask.CrmSync, 60);
      this.logger.log(`Start syncPositionStatus @ ${new Date()}`);
      await this.crmService.syncIncidentStatus().then(async (rows) => {
        for (const row of rows) {
          const [crm_id, crm_lookup_name, crm_status, crm_category] = row as [string, string, string, string];
          const positionRequest = await this.prisma.positionRequest.findUnique({ where: { crm_id: +crm_id } });
          const positionNumber = positionRequest.position_number?.toString();

          if (positionNumber) {
            const result = await this.peoplesoftService.getPosition(positionNumber.padStart(8, '0'));
            const rows = result?.data?.query?.rows;
            const positionObj: Record<string, any> | null = (rows ?? []).length > 0 ? rows[0] : null;

            if (positionObj) {
              const incomingPositionRequestStatus = getALStatus({
                category: crm_category,
                crm_status: crm_status,
                ps_status: positionObj['A.POSN_STATUS'],
                ps_effective_status: positionObj['A.EFF_STATUS'],
              });

              if (incomingPositionRequestStatus === 'UNKNOWN') {
                this.logger.warn(
                  `Failed to map to an internal status for crm_id: ${crm_id}, crm_lookup_name: ${crm_lookup_name}, crm status:  ${crm_status}, crm category: ${crm_category}, ps status: ${positionObj['A.POSN_STATUS']}`,
                );
                continue;
              }

              // Conditionally update the positionRequest.crm_lookup_name
              if (positionRequest.crm_lookup_name !== crm_lookup_name) {
                await this.prisma.positionRequest.update({
                  where: { crm_id: +crm_id },
                  data: {
                    crm_lookup_name: crm_lookup_name,
                  },
                });
              }

              // Conditionally update the positionRequest.status
              if (positionRequest.status !== incomingPositionRequestStatus) {
                this.logger.log(
                  `Updating status ${positionRequest.status} to ${incomingPositionRequestStatus} 
                  crm_id: ${crm_id}, crm_lookup_name: ${crm_lookup_name}, 
                  crm status:  ${crm_status}, crm category: ${crm_category}, 
                  ps status: ${positionObj['A.POSN_STATUS']}, ps effective status: ${positionObj['A.EFF_STATUS']}`,
                );

                const status = incomingPositionRequestStatus as PositionRequestStatus;
                // if status is completed, update approved_at date
                const approved_at = status === 'COMPLETED' ? dayjs().toDate() : null;
                // if status is review, set approved type to "REVIEWED"
                const reviewed = status === 'REVIEW' ? 'REVIEWED' : null;
                await this.prisma.positionRequest.update({
                  where: { crm_id: +crm_id },
                  data: {
                    status: status,
                    ...(approved_at === null
                      ? {}
                      : { approved_at, time_to_approve: dayjs().diff(positionRequest.submitted_at, 'second') }),
                    ...(reviewed === null ? {} : { approval_type: 'REVIEWED' }),
                  },
                });
              }
            }
          }
        }
      });
      this.logger.log(`End syncPositionStatus @ ${new Date()}`);
    }
  }

  @Cron('*/5 * * * * *')
  async syncUsers() {
    if (process.env.E2E_TESTING === 'true') {
      return;
    }
    const needsUpdate = await this.isMetadataOutdated(ScheduledTask.UserSync);

    if (needsUpdate === true) {
      this.logger.log(`Start syncUsers @ ${new Date()}`);

      await this.updateMetadata(ScheduledTask.UserSync, 86400);
      await this.userService.syncUsers();

      this.logger.log(`End syncUsers @ ${new Date()}`);
    }
  }

  @Cron('*/20 * * * * *')
  async updateJobProfileViewCount() {
    const jobProfileCounts: Map<number, number> = await this.cacheManager.get('jobProfileCounts');

    if (!jobProfileCounts) {
      return 0; // Handle case where there are no job profile counts
    }
    const jobProfileVersionCounts = Array.from(jobProfileCounts.entries()).map(async ([id, count]) => {
      const jp = this.prisma.currentJobProfile.findUnique({
        where: { id: id },
      });
      return { id, version: (await jp).version, count };
    });
    jobProfileVersionCounts;
    const updates = await Promise.all(jobProfileVersionCounts).then((values) => {
      // console.log(values);
      return values.map((v) =>
        this.prisma.jobProfile.update({
          where: { id_version: { id: v.id || -1, version: v.version || -1 } },
          data: {
            views: { increment: v.count },
          },
        }),
      );
    });
    await this.cacheManager.del('jobProfileCounts');

    return (await this.prisma.$transaction(updates)).length;
  }
}
