import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileStream } from '../../@generated/prisma-nestjs-graphql';
import { AllowNoRoles } from '../auth/guards/role-global.guard';
import { JobProfileStreamService } from './job-profile-stream.service';

@Resolver(() => JobProfileStream)
export class JobProfileStreamResolver {
  constructor(private readonly jobProfileStreamService: JobProfileStreamService) {}

  @AllowNoRoles()
  @Query(() => [JobProfileStream], { name: 'jobProfileStreams' })
  getJobProfileStreams() {
    return this.jobProfileStreamService.getJobProfileStreams();
  }
}
