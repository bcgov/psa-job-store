import { Module } from '@nestjs/common';
import { AppLogController } from './app-log.controller';
import { AppLogService } from './app-log.service';

@Module({
  controllers: [AppLogController],
  providers: [AppLogService],
})
export class AppLogModule {}
