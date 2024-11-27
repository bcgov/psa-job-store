import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule],
  providers: [KeycloakService, PeoplesoftService, PeoplesoftV2Service, UserService, UserResolver],
  exports: [KeycloakService, PeoplesoftV2Service, UserService],
})
export class UserModule {}
