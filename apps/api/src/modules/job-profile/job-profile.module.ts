import { Module } from '@nestjs/common';
import { ClassificationModule } from '../classification/classification.module';
import { ClassificationService } from '../classification/classification.service';
import { JobFamilyModule } from '../job-family/job-family.module';
import { JobFamilyService } from '../job-family/job-family.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JobProfileResolver } from './job-profile.resolver';
import { JobProfileService } from './job-profile.service';

@Module({
  imports: [ClassificationModule, JobFamilyModule, PrismaModule],
  providers: [ClassificationService, JobFamilyService, JobProfileResolver, JobProfileService],
})
export class JobProfileModule {}
