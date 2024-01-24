import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileMinimumRequirements } from '../../@generated/prisma-nestjs-graphql';
import { JobProfileMinimumRequirementsService } from './job-profile-minimum-requirements.service';

@Resolver(() => JobProfileMinimumRequirements)
export class JobProfileMinimumRequirementsResolver {
  constructor(private readonly jobProfileMinimumRequirementsService: JobProfileMinimumRequirementsService) {}

  @Query(() => [JobProfileMinimumRequirements], { name: 'jobProfileMinimumRequirements' })
  getJobProfileMinimumRequirements() {
    return this.jobProfileMinimumRequirementsService.getJobProfileMinimumRequirements();
  }
}
