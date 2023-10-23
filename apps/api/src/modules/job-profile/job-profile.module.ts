import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JobProfileResolver } from './job-profile.resolver';
import { JobProfileService } from './job-profile.service';

@Module({
  imports: [PrismaModule],
  providers: [JobProfileResolver, JobProfileService],
})
export class JobProfileModule {}
