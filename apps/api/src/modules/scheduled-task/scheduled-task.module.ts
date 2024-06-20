import { HttpModule } from '@nestjs/axios';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { KeycloakService } from '../external/keycloak.service';
import { PeoplesoftV2Service } from '../external/peoplesoft-v2.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
  imports: [ExternalModule, HttpModule, PrismaModule, UserModule],
  providers: [CrmService, KeycloakService, PeoplesoftService, PeoplesoftV2Service, ScheduledTaskService, UserService],
})
export class ScheduledTaskModule implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(ScheduledTaskModule.name);

  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  async onApplicationBootstrap() {
    await this.scheduledTaskService.syncPositionStatuses();
    await this.scheduledTaskService.syncPeoplesoftData();
    await this.scheduledTaskService.syncUsers();
  }
}
//
