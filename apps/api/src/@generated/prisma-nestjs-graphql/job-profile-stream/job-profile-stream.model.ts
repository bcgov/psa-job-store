import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileJobFamily } from '../job-profile-job-family/job-profile-job-family.model';
import { JobProfileStreamLink } from '../job-profile-stream-link/job-profile-stream-link.model';

@ObjectType()
export class JobProfileStream {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileJobFamily, { nullable: false })
  job_family?: JobProfileJobFamily;

  @Field(() => [JobProfileStreamLink], { nullable: true })
  jobProfiles?: Array<JobProfileStreamLink>;
}
