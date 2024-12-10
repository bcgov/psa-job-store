import { Module } from '@nestjs/common';
import { E2EAuthController } from './e2e-auth.controller';

@Module({
  imports: [],
  controllers: [E2EAuthController],
})
export class E2EAuthModule {}
