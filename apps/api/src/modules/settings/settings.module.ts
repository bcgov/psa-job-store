import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { ImportUserResolver } from './import-user/import-user.resolver';
import { ImportUserService } from './import-user/import-user.service';

@Module({
  imports: [ExternalModule, HttpModule, KeycloakModule, PrismaModule, UserModule, PrismaModule],
  providers: [ImportUserResolver, ImportUserService],
})
export class SettingsModule {}
