import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { PeoplesoftService } from '../external/peoplesoft.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthService } from './auth.service';
import { ProfileResolver } from './profile.resolver';
import { KeycloakStrategy } from './strategies/keycloak.strategy';

@Module({
  imports: [HttpModule, PrismaModule, ExternalModule],
  providers: [AuthService, KeycloakStrategy, PeoplesoftService, ProfileResolver],
  exports: [AuthService],
})
export class AuthModule {}
