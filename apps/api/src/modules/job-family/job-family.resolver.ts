import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileJobFamily } from '../../@generated/prisma-nestjs-graphql';
import { AllowNoRoles } from '../auth/guards/role-global.guard';
import { JobFamilyService } from './job-family.service';

@Resolver(() => JobProfileJobFamily)
export class JobFamilyResolver {
  constructor(private readonly jobFamilyService: JobFamilyService) {}

  @AllowNoRoles()
  @Query(() => [JobProfileJobFamily], { name: 'jobFamilies' })
  getJobFamilies() {
    return this.jobFamilyService.getJobFamilies();
  }
}
