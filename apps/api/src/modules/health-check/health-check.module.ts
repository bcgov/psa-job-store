import { Module } from '@nestjs/common';
import { SearchModule } from '../search/search.module';
import { HealthCheckController } from './health-check.controller';

@Module({
  imports: [SearchModule], // , PrismaModule
  controllers: [HealthCheckController],
})
export class HealthCheckModule {}
