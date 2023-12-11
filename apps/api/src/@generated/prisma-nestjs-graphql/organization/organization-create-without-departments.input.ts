import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutOrganizationInput } from '../job-profile/job-profile-create-nested-many-without-organization.input';

@InputType()
export class OrganizationCreateWithoutDepartmentsInput {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutOrganizationInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutOrganizationInput;
}
