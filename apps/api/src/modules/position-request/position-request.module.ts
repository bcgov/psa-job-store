import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ClassificationService } from '../external/classification.service';
import { CrmService } from '../external/crm.service';
import { DepartmentService } from '../external/department.service';
import { ExternalModule } from '../external/external.module';
import { OrganizationService } from '../external/organization.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PositionService } from '../external/position.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PositionRequestApiResolver } from './position-request.resolver';
import { PositionRequestApiService } from './position-request.service';

@Module({
  imports: [ExternalModule, HttpModule, PrismaModule],
  providers: [
    ClassificationService,
    CrmService,
    PeoplesoftService,
    PositionRequestApiResolver,
    PositionRequestApiService,
    PositionService,
    DepartmentService,
    OrganizationService,
  ],
})
export class PositionRequestModule {}
