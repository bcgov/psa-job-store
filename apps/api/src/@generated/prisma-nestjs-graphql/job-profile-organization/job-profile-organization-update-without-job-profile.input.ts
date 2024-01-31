import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput } from '../organization/organization-update-one-required-without-job-profile-organization-nested.input';

@InputType()
export class JobProfileOrganizationUpdateWithoutJob_profileInput {
  @Field(() => OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput, { nullable: true })
  organization?: OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput;
}
