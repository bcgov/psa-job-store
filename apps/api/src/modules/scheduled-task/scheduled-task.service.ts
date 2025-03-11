import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { PositionRequestStatus, Prisma } from '@prisma/client';
import { Cache } from 'cache-manager';
import { getALStatus } from 'common-kit';
import dayjs from 'dayjs';
import { globalLogger } from '../../utils/logging/logger.factory';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

export enum ScheduledTask {
  CrmSync = 'crm-sync',
  PeoplesoftSync = 'peoplesoft-sync',
  UserSync = 'user-sync',
  // FastTask = 'fast-task',
  // SlowTask = 'slow-task',
}

interface TaskConfig {
  name: ScheduledTask;
  lockTimeout: number; // in seconds
  frequency: number;
}
@Injectable()
export class ScheduledTaskService {
  private readonly taskConfigs: Record<ScheduledTask, TaskConfig> = {
    [ScheduledTask.UserSync]: {
      name: ScheduledTask.UserSync,
      lockTimeout: 12 * 60 * 60, // 12 hours
      frequency: 24 * 60 * 60, // 24 hours
    },
    [ScheduledTask.PeoplesoftSync]: {
      name: ScheduledTask.PeoplesoftSync,
      lockTimeout: 12 * 60 * 60, // 12 hours
      frequency: 24 * 60 * 60, // 24 hours
    },
    [ScheduledTask.CrmSync]: {
      name: ScheduledTask.CrmSync,
      lockTimeout: 5 * 60, // 5 minutes
      frequency: 1 * 60, // 1 minute
    },
    // [ScheduledTask.FastTask]: {
    //   name: ScheduledTask.FastTask,
    //   lockTimeout: 30, // 30 seconds
    //   frequency: 10, // every 10 seconds
    // },
    // [ScheduledTask.SlowTask]: {
    //   name: ScheduledTask.SlowTask,
    //   lockTimeout: 60, // 60 seconds
    //   frequency: 20, // every 20 seconds
    // },
  };

  private readonly logger = new Logger(ScheduledTaskService.name);

  constructor(
    private readonly crmService: CrmService,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  private async isMetadataOutdated(task: ScheduledTask): Promise<boolean> {
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

  private async acquireLock(task: ScheduledTask): Promise<boolean> {
    const lockTimeout = this.taskConfigs[task].lockTimeout;

    try {
      // Clean expired locks first
      const deletedLocks = await this.prisma.cronLock.deleteMany({
        where: {
          name: task,
          locked_at: {
            lt: new Date(Date.now() - lockTimeout * 1000),
          },
        },
      });

      if (deletedLocks.count > 0) {
        this.logger.warn(`Cleaned up ${deletedLocks.count} expired lock(s) for ${task}`);
      }

      await this.prisma.cronLock.create({
        data: {
          name: task,
          locked_at: new Date(),
        },
      });

      this.logger.log(`Lock acquired for ${task} by ${process.env.HOSTNAME || 'local'}`);
      return true;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.log(`Failed to acquire lock for ${task}: ${errorMessage}`);
      return false;
    }
  }

  private async releaseLock(task: ScheduledTask) {
    try {
      await this.prisma.cronLock.delete({
        where: { name: task },
      });
      this.logger.log(`Lock released for ${task}`);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to release lock for ${task}: ${errorMessage}`);
    }
  }

  private async executeTask(task: ScheduledTask, execution: () => Promise<void>) {
    const config = this.taskConfigs[task];
    let needsUpdate = await this.isMetadataOutdated(task);

    if (process.env.E2E_TESTING === 'true' && task !== ScheduledTask.CrmSync) return;

    // Only run CRM sync in E2E testing - will sync against mock CRM
    if (process.env.E2E_TESTING === 'true' && task == ScheduledTask.CrmSync) needsUpdate = true;

    if (!needsUpdate) {
      // this.logger.log(`${task} doesn't need update yet`);
      return;
    }

    const hasLock = await this.acquireLock(task);
    if (!hasLock) {
      // this.logger.log(`${task} couldn't acquire lock, skipping`);
      return;
    }

    try {
      this.logger.log(`Starting ${task} @ ${new Date()}`);
      await this.updateMetadata(task, config.frequency);
      await execution();
      this.logger.log(`Completed ${task} @ ${new Date()}`);
      globalLogger.info(
        {
          log_data: {
            taskname: task,
            result: 'success',
          },
        },
        'Completed scheduled task',
      );
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error in ${task}: ${errorMessage}`);

      globalLogger.info(
        {
          log_data: {
            taskname: task,
            result: 'fail',
            error: errorMessage,
          },
        },
        'Completed scheduled task',
      );
    } finally {
      await this.releaseLock(task);
    }
  }

  // @Cron('*/5 * * * * *')
  async syncPeoplesoftData() {
    await this.executeTask(ScheduledTask.PeoplesoftSync, async () => {
      await this.peoplesoftService.syncClassifications();
      await this.peoplesoftService.syncLocations();
      await this.peoplesoftService.syncOrganizationsAndDepartments();
    });
  }

  // @Cron('*/5 * * * * *')
  async syncPositionStatuses() {
    await this.executeTask(ScheduledTask.CrmSync, async () => {
      await this.crmService.syncIncidentStatus().then(async (rows) => {
        // console.log('this.crmService.syncIncidentStatus rows: ', rows);
        for (const row of rows) {
          const [crm_id, crm_lookup_name, crm_status, crm_category] = row as [string, string, string, string];
          const positionRequest = await this.prisma.positionRequest.findUnique({ where: { crm_id: +crm_id } });
          const positionNumber = positionRequest.position_number?.toString();

          // console.log('syncing positionNumber: ', positionNumber);
          if (positionNumber) {
            const result = await this.peoplesoftService.getPosition(positionNumber.padStart(8, '0'));
            const rows = result?.data?.query?.rows;
            const positionObj: Record<string, any> | null = (rows ?? []).length > 0 ? rows[0] : null;

            // console.log('positionObj: ', positionObj);
            if (positionObj) {
              // console.log('calculating status from: ', {
              //   category: crm_category,
              //   crm_status: crm_status,
              //   ps_status: positionObj['A.POSN_STATUS'],
              //   ps_effective_status: positionObj['A.EFF_STATUS'],
              // });
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

                try {
                  // update the pr record and set unknownStateSince to current time
                  await this.prisma.positionRequest.update({
                    where: { id: positionRequest.id },
                    data: {
                      ...(positionRequest.unknownStateSince === null && {
                        unknownStateSince: dayjs().toDate(),
                      }),
                      unknownStateMetadata: {
                        crm_id,
                        crm_lookup_name,
                        crm_status,
                        crm_category,
                        ps_status: positionObj['A.POSN_STATUS'],
                        ps_effective_status: positionObj['A.EFF_STATUS'],
                      },
                    },
                  });

                  globalLogger.error(
                    {
                      log_data: {
                        id: positionRequest.id,
                        type: 'ps_status_change',
                        source: 'automatic',
                        from_status: positionRequest.status,
                        to_status: incomingPositionRequestStatus,
                        crm_id: crm_id,
                        crm_lookup_name: crm_lookup_name,
                        crm_status: crm_status,
                        crm_category: crm_category,
                        ps_status: positionObj['A.POSN_STATUS'],
                        ps_effective_status: positionObj['A.EFF_STATUS'],
                      },
                    },
                    'Failed to map to an internal status',
                  );
                } catch (error) {
                  globalLogger.error(
                    {
                      log_data: {
                        error: error instanceof Error ? error.message : String(error),
                      },
                    },
                    'Error during syncPositionStatuses',
                  );
                }

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

                try {
                  globalLogger.info(
                    {
                      log_data: {
                        id: positionRequest.id,
                        type: 'ps_status_change',
                        source: 'automatic',
                        from_status: positionRequest.status,
                        to_status: incomingPositionRequestStatus,
                        crm_id: crm_id,
                        crm_lookup_name: crm_lookup_name,
                        crm_status: crm_status,
                        crm_category: crm_category,
                        ps_status: positionObj['A.POSN_STATUS'],
                        ps_effective_status: positionObj['A.EFF_STATUS'],
                      },
                    },
                    'Position request status changed',
                  );
                } catch (error) {
                  globalLogger.error(
                    {
                      log_data: {
                        error: error instanceof Error ? error.message : String(error),
                      },
                    },
                    'Error during syncPositionStatuses',
                  );
                }

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
                    unknownStateSince: null, // Reset the unknown state in case it was previously set, since now the status is known
                    unknownStateMetadata: Prisma.DbNull,
                  },
                });
              }
            }
          }
        }
      });
    });
  }

  // @Cron('*/5 * * * * *')
  async syncUsers() {
    await this.executeTask(ScheduledTask.UserSync, async () => await this.userService.syncUsers());
  }

  // @Cron('*/20 * * * * *')
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

  // Test tasks
  // @Cron('*/20 * * * * *')
  // async fastTask() {
  //   await this.executeTask(ScheduledTask.FastTask, async () => {
  //     this.logger.log('Fast task processing...');
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 second task
  //     this.logger.log('Fast task done');
  //   });
  // }

  // @Cron('*/20 * * * * *')
  // async slowTask() {
  //   await this.executeTask(ScheduledTask.SlowTask, async () => {
  //     this.logger.log('Slow task processing...');
  //     await new Promise((resolve) => setTimeout(resolve, 15000)); // 15 second task
  //     this.logger.log('Slow task done');
  //   });
  // }

  // // Simulate a crash by not releasing the lock
  // @Cron('*/30 * * * * *')
  // async crashingTask() {
  //   const task = ScheduledTask.FastTask;
  //   if (await this.acquireLock(task)) {
  //     this.logger.warn('Simulating crash - lock will not be released');
  //     throw new Error('Simulated crash');
  //   }
  // }
}
