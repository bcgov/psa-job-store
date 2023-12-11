import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Department } from '../department/department.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class Organization {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [Department], { nullable: true })
  departments?: Array<Department>;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;
}
