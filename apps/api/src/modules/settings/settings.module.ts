import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ImportUserResolver } from './import-user/import-user.resolver';
import { ImportUserService } from './import-user/import-user.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule, UserModule, PrismaModule],
  providers: [ImportUserResolver, ImportUserService, KeycloakService, UserService],
})
export class SettingsModule {}
