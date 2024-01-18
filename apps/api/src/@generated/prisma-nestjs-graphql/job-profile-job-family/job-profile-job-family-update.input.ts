import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateManyWithoutJob_familyNestedInput } from '../job-profile/job-profile-update-many-without-job-family-nested.input';
import { JobProfileStreamUpdateManyWithoutJob_familyNestedInput } from '../job-profile-stream/job-profile-stream-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUpdateInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutJob_familyNestedInput;

  @Field(() => JobProfileStreamUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUpdateManyWithoutJob_familyNestedInput;
}
