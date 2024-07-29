import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { PeoplesoftV2Service } from '../external/peoplesoft-v2.service';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule],
  providers: [
    CrmService,
    KeycloakService,
    PeoplesoftService,
    PeoplesoftV2Service,
    PrismaService,
    UserService,
    UserResolver,
  ],
  exports: [KeycloakService, PeoplesoftV2Service],
})
export class UserModule {}
