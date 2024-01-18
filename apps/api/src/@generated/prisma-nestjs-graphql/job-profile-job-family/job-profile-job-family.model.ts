import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { JobProfileStream } from '../job-profile-stream/job-profile-stream.model';

@ObjectType()
export class JobProfileJobFamily {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;

  @Field(() => [JobProfileStream], { nullable: true })
  JobProfileStream?: Array<JobProfileStream>;
}
