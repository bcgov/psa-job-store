import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JobProfileStreamResolver } from './job-profile-stream.resover';
import { JobProfileStreamService } from './job-profile-stream.service';

@Module({
  imports: [PrismaModule],
  providers: [JobProfileStreamResolver, JobProfileStreamService],
})
export class JobProfileStreamModule {}
