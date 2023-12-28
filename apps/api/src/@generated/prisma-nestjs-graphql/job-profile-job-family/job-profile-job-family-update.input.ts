import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutJob_familyNestedInput } from '../job-profile/job-profile-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutJob_familyNestedInput;
}
