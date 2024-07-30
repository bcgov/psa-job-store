import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { KeycloakService } from '../keycloak/keycloak.service';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { ImportUserResolver } from './import-user/import-user.resolver';
import { ImportUserService } from './import-user/import-user.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule, UserModule],
  providers: [CrmService, ImportUserResolver, ImportUserService, KeycloakService, PrismaService, UserService],
})
export class SettingsModule {}
