import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileRole } from '../../@generated/prisma-nestjs-graphql';
import { JobRoleService } from './job-role.service';

@Resolver(() => JobProfileRole)
export class JobRoleResolver {
  constructor(private readonly jobRoleService: JobRoleService) {}

  @Query(() => [JobProfileRole], { name: 'jobRoles' })
  getJobRoles() {
    return this.jobRoleService.getJobRoles();
  }
}
