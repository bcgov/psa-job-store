import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileStream } from '../job-profile-stream/job-profile-stream.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileStreamLink {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  streamId!: number;

  @Field(() => JobProfile, { nullable: false })
  jobProfile?: JobProfile;

  @Field(() => JobProfileStream, { nullable: false })
  stream?: JobProfileStream;
}
