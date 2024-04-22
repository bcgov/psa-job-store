import { Field, InputType } from '@nestjs/graphql';
import { OrganizationCreateNestedOneWithoutJobProfileOrganizationInput } from '../organization/organization-create-nested-one-without-job-profile-organization.input';

@InputType()
export class JobProfileOrganizationCreateWithoutJob_profileInput {
  @Field(() => OrganizationCreateNestedOneWithoutJobProfileOrganizationInput, { nullable: false })
  organization!: OrganizationCreateNestedOneWithoutJobProfileOrganizationInput;
}
