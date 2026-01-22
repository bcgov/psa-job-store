import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ScheduledTaskService } from './scheduled-task.service';
import { PositionRequestApiService } from '../position-request/position-request.service';
import { PositionRequestModule } from '../position-request/position-request.module';
import { ClassificationService } from '../external/classification.service';
import { DepartmentService } from '../organization/department/department.service';
import { PositionService } from '../external/position.service';
import { JobProfileService } from '../job-profile/job-profile.service';
import { OrganizationService } from '../organization/organization/organization.service';
import { SearchModule } from '../search/search.module';

@Module({
  imports: [
    ExternalModule,
    HttpModule,
    KeycloakModule,
    PrismaModule,
    UserModule,
    PositionRequestModule,
    SearchModule,
    CacheModule.register(),
  ],
  providers: [
    ScheduledTaskService,
    PositionRequestApiService,
    ClassificationService,
    DepartmentService,
    PositionService,
    JobProfileService,
    OrganizationService,
  ],
})
export class ScheduledTaskModule implements OnApplicationBootstrap {
  private readonly logger: Logger = new Logger(ScheduledTaskModule.name);

  constructor(private readonly scheduledTaskService: ScheduledTaskService) {}

  async onApplicationBootstrap() {
    /*
    await this.scheduledTaskService.syncPositionStatuses();
    await this.scheduledTaskService.syncPeoplesoftData();
    */
    //await this.scheduledTaskService.syncUsers();
    // Manual syncing of Fusion data
    //await this.scheduledTaskService.syncFusionData();
    //await this.scheduledTaskService.syncFusionPositionData();
    //await this.scheduledTaskService.queryFusionRequestStatus();
  }
}
