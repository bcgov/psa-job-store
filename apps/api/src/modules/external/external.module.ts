import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ClassificationResolver } from './classification.resolver';
import { ClassificationService } from './classification.service';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { OrgChartResolver } from './org-chart.resolver';
import { OrgChartService } from './org-chart.service';
import { OrganizationResolver } from './organization.resolver';
import { OrganizationService } from './organization.service';
import { PeoplesoftService } from './peoplesoft.service';
import { PositionResolver } from './position.resolver';
import { PositionService } from './position.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [
    ClassificationResolver,
    ClassificationService,
    DepartmentResolver,
    DepartmentService,
    OrganizationResolver,
    OrganizationService,
    PositionResolver,
    PositionService,
    PrismaService,
    OrgChartResolver,
    OrgChartService,
    PeoplesoftService,
  ],
})
export class ExternalModule {}
