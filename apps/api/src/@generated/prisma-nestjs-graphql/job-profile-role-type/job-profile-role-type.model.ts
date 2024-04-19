import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileRoleType {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;
}
