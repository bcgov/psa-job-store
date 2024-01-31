import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileContext {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfile, { nullable: false })
  job_profile?: JobProfile;
}
