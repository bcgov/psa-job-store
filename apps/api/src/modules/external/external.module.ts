import { HttpModule, HttpService } from '@nestjs/axios';
import { Module, forwardRef } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import qs from 'qs';
import { AppConfigDto } from '../../dtos/app-config.dto';
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
import { MockIncidentResolver } from './crm.mock.resolver';
import { CrmService } from './crm.service';
import { MockCrmService } from './crm.service.mock';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
import { OrgChartResolver } from './org-chart.resolver';
import { OrgChartService } from './org-chart.service';
import { PeoplesoftV2Service } from './peoplesoft-v2.service';
import { MockPeopleSoftResolver } from './peoplesoft.mock.resolver';
import { PeoplesoftService } from './peoplesoft.service';
import { MockPeoplesoftService } from './peoplesoft.service.mock';
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
    OrgChartResolver,
    MockIncidentResolver,
    MockPeopleSoftResolver,
    OrgChartService,
    {
      provide: PeoplesoftService,
      useFactory: (
        configService: ConfigService<AppConfigDto, true>,
        httpService: HttpService,
        prisma: PrismaService,
        searchService: SearchService,
      ) => {
        if (configService.get('USE_MOCKS') === 'true') {
          return new MockPeoplesoftService(configService);
        } else {
          return new PeoplesoftService(configService, httpService, prisma, searchService);
        }
      },
      inject: [ConfigService, HttpService, PrismaService, SearchService],
    },
    {
      provide: CrmService,
      useFactory: (
        configService: ConfigService<AppConfigDto, true>,
        httpService: HttpService,
        prisma: PrismaService,
      ) => {
        if (configService.get('USE_MOCKS') === 'true') {
          return new MockCrmService(configService);
        } else {
          return new CrmService(configService, httpService, prisma);
        }
      },
      inject: [ConfigService, HttpService, PrismaService],
    },
    LocationService,
    LocationResolver,
    PositionService,
    KeycloakService,
    // {
    //   provide: PeoplesoftV2Service,
    //   useFactory: (
    //     configService: ConfigService<AppConfigDto, true>,
    //     httpService: HttpService,
    //     prisma: PrismaService,
    //   ) => {
    //     if (configService.get('USE_MOCKS') === 'true') {
    //       return new PeoplesoftV2Service(configService, httpService, prisma);
    //       // return new MockPeoplesoftService(configService);
    //     } else {
    //       return new PeoplesoftV2Service(configService, httpService, prisma);
    //     }
    //   },
    //   inject: [ConfigService, HttpService, PrismaService],
    // },
    PeoplesoftV2Service,
    SearchService,
  ],
  exports: [SearchService, PeoplesoftService, PeoplesoftV2Service, CrmService], // Export PeoplesoftService and CrmService
})
export class ExternalModule {}
