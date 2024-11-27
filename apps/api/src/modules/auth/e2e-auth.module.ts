import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { E2EAuthController } from './e2e-auth.controller';

@Module({
  imports: [
    // makes JWT services available to the E2EAuthController
    // the JWT configuration is only accessible to components within this module
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('E2E_JWT_SECRET'),
        signOptions: {
          expiresIn: '1h', // Token expiration time
          issuer: 'e2e-testing',
          audience: 'e2e-testing',
          algorithm: 'HS256',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [E2EAuthController],
})
export class E2EAuthModule {}
