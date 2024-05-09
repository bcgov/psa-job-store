import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PositionRequestStatus } from '@prisma/client';
import { getALStatus } from 'common-kit';
import dayjs from 'dayjs';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';

export enum ScheduledTask {
  PeoplesoftSync = 'peoplesoft-sync',
  CrmSync = 'crm-sync',
}

@Injectable()
export class ScheduledTaskService {
  private readonly logger = new Logger(ScheduledTaskService.name);

  constructor(
    private readonly crmService: CrmService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
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
    const needsUpdate = await this.isMetadataOutdated(ScheduledTask.PeoplesoftSync);
    if (needsUpdate === true) {
      await this.updateMetadata(ScheduledTask.PeoplesoftSync, 86400);
      await this.peoplesoftService.syncClassifications();
      await this.peoplesoftService.syncLocations();
      await this.peoplesoftService.syncOrganizationsAndDepartments();
    }
  }

  @Cron('*/1 * * * * *')
  async syncPositionStatuses() {
    const needsUpdate = await this.isMetadataOutdated(ScheduledTask.CrmSync);

    if (needsUpdate === true) {
      await this.updateMetadata(ScheduledTask.CrmSync, 60);
      this.logger.log(`Start syncPositionStatus @ ${new Date()}`);
      await this.crmService.syncIncidentStatus().then(async (rows) => {
        for (const row of rows) {
          const [crm_id, crm_lookup_name, crm_status, crm_category] = row as [string, string, string, string];
          const positionRequest = await this.prisma.positionRequest.findUnique({ where: { crm_id: +crm_id } });
          const positionNumber = positionRequest.position_number.toString();

          if (positionNumber) {
            const result = await this.peoplesoftService.getPosition(positionNumber.padStart(8, '0'));
            const rows = result?.data?.query?.rows;
            const positionObj: Record<string, any> | null = (rows ?? []).length > 0 ? rows[0] : null;

            if (positionObj) {
              const incomingPositionRequestStatus = getALStatus({
                category: crm_category,
                crm_status: crm_status,
                ps_status: positionObj['A.POSN_STATUS'],
                ps_effective_status: positionObj['EFF_STATUS'],
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

                await this.prisma.positionRequest.update({
                  where: { crm_id: +crm_id },
                  data: {
                    status: incomingPositionRequestStatus as PositionRequestStatus,
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
}
