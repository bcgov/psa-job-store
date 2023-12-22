import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';

@ObjectType()
export class Classification {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  reportees?: Array<JobProfileReportsTo>;
}
