import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileScope } from '../../@generated/prisma-nestjs-graphql';
import { JobProfileScopeService } from './job-profile-scope.service';

@Resolver(() => JobProfileScope)
export class JobProfileScopeResolver {
  constructor(private readonly jobProfileScopeService: JobProfileScopeService) {}

  @Query(() => [JobProfileScope], { name: 'jobProfileScopes' })
  getJobProfileScopes() {
    return this.jobProfileScopeService.getJobProfileScopes();
  }
}
