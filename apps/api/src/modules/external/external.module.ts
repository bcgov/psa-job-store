import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfigDto } from '../../dtos/app-config.dto';
import { Environment } from '../../enums/environment.enum';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { ClassificationResolver } from './classification.resolver';
import { ClassificationService } from './classification.service';
import { CrmService } from './crm.service';
import { DepartmentResolver } from './department.resolver';
import { DepartmentService } from './department.service';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
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
    PrismaService,
    OrgChartResolver,
    OrgChartService,
    PeoplesoftService,
    CrmService,
    LocationService,
    LocationResolver,
    PositionService,
  ],
})
export class ExternalModule {
  constructor(
    private readonly configService: ConfigService<AppConfigDto, true>,
    private readonly peoplesoftService: PeoplesoftService,
    private readonly prisma: PrismaService,
  ) {
    (async () => {
      // To reduce API requests in non-production mode, only fetch these records if their counts === 0
      // In production, fetch records on server start
      if (this.configService.get('NODE_ENV') !== Environment.Production) {
        const classificationCount = await this.prisma.classification.count();
        if (classificationCount < 100) {
          await this.peoplesoftService.syncClassifications();
        }

        const locationCount = await this.prisma.location.count();
        if (locationCount < 100) {
          await this.peoplesoftService.syncLocations();
        }

        const organizationCount = await this.prisma.organization.count();
        const departmentCount = await this.prisma.department.count();
        const classificationDepartmentsCount = await this.prisma.classificationDepartment.count();
        if (organizationCount < 100 || departmentCount < 100 || classificationDepartmentsCount < 100) {
          await this.peoplesoftService.syncOrganizationsAndDepartments();
        }
      } else {
        await this.peoplesoftService.syncClassifications();
        await this.peoplesoftService.syncLocations();
        await this.peoplesoftService.syncOrganizationsAndDepartments();
      }
    })();
  }
}
