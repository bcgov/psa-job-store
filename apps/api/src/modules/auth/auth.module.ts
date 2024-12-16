import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ExternalModule } from '../external/external.module';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { PrismaModule } from '../prisma/prisma.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { IDIRStrategyFactory } from './factories/oidc-strategy.factory';
import { PublicRouteBypassGuard } from './guards/public-route-bypass.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { SessionSerializer } from './serializers/session.serializer';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({
      // keepSessionInfo: true,
      session: true,
    }),
    ExternalModule,
    KeycloakModule,
    PrismaModule,
    UserModule,
  ],
  providers: [AuthService, IDIRStrategyFactory, PublicRouteBypassGuard, SessionAuthGuard, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
