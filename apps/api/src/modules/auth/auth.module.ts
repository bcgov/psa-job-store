import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CrmService } from '../external/crm.service';
import { ExternalModule } from '../external/external.module';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { ProfileResolver } from './profile.resolver';
import { KeycloakStrategy } from './strategies/keycloak.strategy';

@Module({
  imports: [HttpModule, PrismaModule, ExternalModule, UserModule],
  providers: [AuthService, CrmService, KeycloakStrategy, PeoplesoftService, ProfileResolver, UserService],
  exports: [AuthService],
})
export class AuthModule {}
