import { Field, InputType } from '@nestjs/graphql';
import { JobProfileStreamUpdateManyWithoutJob_familyNestedInput } from '../job-profile-stream/job-profile-stream-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUpdateWithoutJobProfilesInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileStreamUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUpdateManyWithoutJob_familyNestedInput;
}
