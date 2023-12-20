import { Query, Resolver } from '@nestjs/graphql';
import { JobFamily } from '../../@generated/prisma-nestjs-graphql';
import { JobFamilyService } from './job-family.service';

@Resolver(() => JobFamily)
export class JobFamilyResolver {
  constructor(private readonly jobFamilyService: JobFamilyService) {}

  @Query(() => [JobFamily], { name: 'jobFamilies' })
  getJobFamilies() {
    return this.jobFamilyService.getJobFamilies();
  }
}
