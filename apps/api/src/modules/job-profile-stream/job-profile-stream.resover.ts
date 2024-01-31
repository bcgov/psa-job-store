import { Query, Resolver } from '@nestjs/graphql';
import { JobProfileStream } from '../../@generated/prisma-nestjs-graphql';
import { JobProfileStreamService } from './job-profile-stream.service';

@Resolver(() => JobProfileStream)
export class JobProfileStreamResolver {
  constructor(private readonly jobProfileStreamService: JobProfileStreamService) {}

  @Query(() => [JobProfileStream], { name: 'jobProfileStreams' })
  getJobProfileStreams() {
    return this.jobProfileStreamService.getJobProfileStreams();
  }
}
