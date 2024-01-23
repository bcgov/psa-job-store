import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { JobProfileMinimumRequirementsResolver } from './job-profile-minimum-requirements.resover';
import { JobProfileMinimumRequirementsService } from './job-profile-minimum-requirements.service';

@Module({
  imports: [PrismaModule],
  providers: [JobProfileMinimumRequirementsResolver, JobProfileMinimumRequirementsService],
})
export class JobProfileMinimumRequirementsModule {}
