import { HttpModule } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import qs from 'qs';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { KeycloakService } from '../keycloak/keycloak.service';
import { DepartmentResolver } from '../organization/department/department.resolver';
import { DepartmentService } from '../organization/department/department.service';
import { OrganizationModule } from '../organization/organization.module';
import { OrganizationResolver } from '../organization/organization/organization.resolver';
import { OrganizationService } from '../organization/organization/organization.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SearchModule } from '../search/search.module';
import { SearchService } from '../search/search.service';
import { ClassificationResolver } from './classification.resolver';
import { ClassificationService } from './classification.service';
import { CrmService } from './crm.service';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
import { OrgChartResolver } from './org-chart.resolver';
import { OrgChartService } from './org-chart.service';
import { PeoplesoftV2Service } from './peoplesoft-v2.service';
import { PeoplesoftService } from './peoplesoft.service';
import { PositionResolver } from './position.resolver';
import { PositionService } from './position.service';

@Module({
  imports: [
    HttpModule.register({
      paramsSerializer: (params) => qs.stringify(params, { encode: false }),
    }),
    KeycloakModule,
    forwardRef(() => OrganizationModule),
    PrismaModule,
    SearchModule,
  ],
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
    KeycloakService,
    PeoplesoftV2Service,
    SearchService,
  ],
  exports: [SearchService],
})
export class ExternalModule {}
