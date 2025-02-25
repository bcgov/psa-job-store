import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SearchModule } from '../search/search.module';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule, SearchModule, ExternalModule],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
