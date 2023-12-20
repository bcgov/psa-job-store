import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Classification } from '../classification/classification.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileReportsTo {
  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Classification, { nullable: false })
  classification?: Classification;

  @Field(() => JobProfile, { nullable: false })
  job_profile?: JobProfile;
}
