import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { JobProfileStream } from '../job-profile-stream/job-profile-stream.model';

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
