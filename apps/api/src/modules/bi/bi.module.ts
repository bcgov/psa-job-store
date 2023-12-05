import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { BIService } from './bi.service';

@Module({
  imports: [HttpModule, PrismaModule],
  providers: [BIService],
})
export class BIModule {}
