import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import qs from 'qs';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SearchModule } from '../search/search.module';
import { SearchService } from '../search/search.service';
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
