import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthController } from './controllers/auth.controller';
import { OIDCStrategyFactory } from './factories/oidc-strategy.factory';
import { PublicRouteBypassGuard } from './guards/public-route-bypass.guard';
import { SessionAuthGuard } from './guards/session-auth.guard';
import { SessionSerializer } from './serializers/session.serializer';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'oidc',
      // keepSessionInfo: true,
      session: true,
    }),
    UserModule,
  ],
  providers: [AuthService, OIDCStrategyFactory, PublicRouteBypassGuard, SessionAuthGuard, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
