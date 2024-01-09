import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-organization-nested.input';

@InputType()
export class OrganizationUncheckedUpdateWithoutDepartmentsInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => String, { nullable: true })
  peoplesoft_id?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  effective_status?: string;

  @Field(() => Date, { nullable: true })
  effective_date?: Date | string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutOrganizationNestedInput;
}
