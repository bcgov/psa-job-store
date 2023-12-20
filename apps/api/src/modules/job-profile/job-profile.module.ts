import { Module } from '@nestjs/common';
import { ClassificationService } from '../classification/classification.service';
import { ExternalModule } from '../external/external.module';
import { JobFamilyModule } from '../job-family/job-family.module';
import { JobFamilyService } from '../job-family/job-family.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SearchModule } from '../search/search.module';
import { JobProfileResolver } from './job-profile.resolver';
import { JobProfileService } from './job-profile.service';

@Module({
  imports: [ExternalModule, JobFamilyModule, PrismaModule, SearchModule],
  providers: [ClassificationService, JobFamilyService, JobProfileResolver, JobProfileService],
})
export class JobProfileModule {}
