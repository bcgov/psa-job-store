import { HttpModule } from '@nestjs/axios';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaModule } from '../prisma/prisma.module';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
  imports: [ExternalModule, HttpModule, PrismaModule],
  providers: [CrmService, PeoplesoftService, ScheduledTaskService],
})
export class ScheduledTaskModule implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(ScheduledTaskModule.name);

  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  async onApplicationBootstrap() {
    await this.scheduledTaskService.syncCrmStatuses();
    await this.scheduledTaskService.syncPeoplesoftData();
  }
}
//
