import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClassificationService } from '../external/classification.service';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PositionService } from '../external/position.service';
import { JobProfileService } from '../job-profile/job-profile.service';
import { DepartmentService } from '../organization/department/department.service';
import { OrganizationModule } from '../organization/organization.module';
import { OrganizationService } from '../organization/organization/organization.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SearchModule } from '../search/search.module';
import { PositionRequestApiResolver } from './position-request.resolver';
import { PositionRequestApiService } from './position-request.service';

@Module({
  imports: [ExternalModule, HttpModule, OrganizationModule, PrismaModule, PrismaModule, SearchModule],
  providers: [
    ClassificationService,
    CrmService,
    DepartmentService,
    JobProfileService,
    OrganizationService,
    PeoplesoftService,
    PositionRequestApiResolver,
    PositionRequestApiService,
    PositionService,
  ],
})
export class PositionRequestModule {}
