import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MinistryResolver } from './ministry.resolver';
import { MinistryService } from './ministry.service';

@Module({
  imports: [PrismaModule],
  providers: [MinistryResolver, MinistryService],
})
export class MinistryModule {}
