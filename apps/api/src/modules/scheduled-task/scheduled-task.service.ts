import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';
import { CrmService } from '../external/crm.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaService } from '../prisma/prisma.service';

enum ScheduledTask {
  PeoplesoftSync = 'peoplesoft-sync',
  CrmSync = 'crm-sync',
}

@Injectable()
export class ScheduledTaskService {
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

  @Cron('*/5 * * * * *')
  async syncCrmStatuses() {
    const needsUpdate = await this.isMetadataOutdated(ScheduledTask.CrmSync);
    if (needsUpdate === true) {
      await this.updateMetadata(ScheduledTask.CrmSync, 60);
      await this.crmService.syncIncidentStatus();
    }
  }
}
