import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedManyWithoutJob_familyInput } from '../job-profile/job-profile-create-nested-many-without-job-family.input';

@InputType()
export class JobProfileJobFamilyCreateInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutJob_familyInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutJob_familyInput;
}
