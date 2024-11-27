import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ExternalModule } from '../external/external.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { ProfileResolver } from './profile.resolver';
import { KeycloakStrategy } from './strategies/keycloak.strategy';

@Module({
  imports: [HttpModule, PrismaModule, ExternalModule, UserModule],
  providers: [AuthService, ProfileResolver, KeycloakStrategy],
  exports: [AuthService],
})
export class AuthModule {}
