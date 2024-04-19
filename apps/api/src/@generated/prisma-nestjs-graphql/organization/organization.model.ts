import { Field, ObjectType } from '@nestjs/graphql';
import { Department } from '../department/department.model';
import { JobProfileOrganization } from '../job-profile-organization/job-profile-organization.model';

@ObjectType()
export class Organization {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date;

  @Field(() => [Department], { nullable: true })
  departments?: Array<Department>;

  @Field(() => [JobProfileOrganization], { nullable: true })
  JobProfileOrganization?: Array<JobProfileOrganization>;
}
