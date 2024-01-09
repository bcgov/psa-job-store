import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateNestedManyWithoutOrganizationInput } from '../job-profile-organization/job-profile-organization-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileOrganizationCreateNestedManyWithoutOrganizationInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationCreateNestedManyWithoutOrganizationInput;
}
