import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileJobFamily } from '../../@generated/prisma-nestjs-graphql';
import { JobFamilyService } from './job-family.service';

@Resolver(() => JobProfileJobFamily)
export class JobFamilyResolver {
  constructor(private readonly jobFamilyService: JobFamilyService) {}

  @Query(() => [JobProfileJobFamily], { name: 'jobFamilies' })
  getJobFamilies() {
    return this.jobFamilyService.getJobFamilies();
  }
}
