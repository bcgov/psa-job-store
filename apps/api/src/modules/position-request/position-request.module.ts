import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PositionRequestApiResolver } from './position-request.resolver';
import { PositionRequestApiService } from './position-request.service';

@Module({
  imports: [PrismaModule],
  providers: [PositionRequestApiResolver, PositionRequestApiService],
})
export class PositionRequestModule {}
