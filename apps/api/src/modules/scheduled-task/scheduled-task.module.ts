import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ScheduledTaskService } from './scheduled-task.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule, UserModule, CacheModule.register()],
  providers: [ScheduledTaskService],
})
export class ScheduledTaskModule implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(ScheduledTaskModule.name);

  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  async onApplicationBootstrap() {
    await this.scheduledTaskService.syncPositionStatuses(true);
    await this.scheduledTaskService.syncPeoplesoftData(true);
    await this.scheduledTaskService.syncUsers(true);
    this.scheduledTaskService.setBootstrapComplete();
  }
}
