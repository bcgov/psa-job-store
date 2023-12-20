import { Query, Resolver } from '@nestjs/graphql';
import { JobRole } from '../../@generated/prisma-nestjs-graphql';
import { JobRoleService } from './job-role.service';

@Resolver(() => JobRole)
export class JobRoleResolver {
  constructor(private readonly jobRoleService: JobRoleService) {}

  @Query(() => [JobRole], { name: 'jobRoles' })
  getJobRoles() {
    return this.jobRoleService.getJobRoles();
  }
}
