import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationUncheckedCreateNestedManyWithoutOrganizationInput } from '../job-profile-organization/job-profile-organization-unchecked-create-nested-many-without-organization.input';

@InputType()
export class OrganizationUncheckedCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileOrganizationUncheckedCreateNestedManyWithoutOrganizationInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationUncheckedCreateNestedManyWithoutOrganizationInput;
}
