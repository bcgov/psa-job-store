import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput;
}
