import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutOrganizationsInput } from '../job-profile/job-profile-create-nested-one-without-organizations.input';

@InputType()
export class JobProfileOrganizationCreateWithoutOrganizationInput {
  @Field(() => JobProfileCreateNestedOneWithoutOrganizationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutOrganizationsInput;
}
