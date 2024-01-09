import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Department } from '../department/department.model';
import { JobProfileOrganization } from '../job-profile-organization/job-profile-organization.model';

@ObjectType()
export class Organization {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [Department], { nullable: true })
  departments?: Array<Department>;

  @Field(() => [JobProfileOrganization], { nullable: true })
  JobProfileOrganization?: Array<JobProfileOrganization>;
}
