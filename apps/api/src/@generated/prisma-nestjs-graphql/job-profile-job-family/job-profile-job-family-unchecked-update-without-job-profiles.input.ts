import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput } from '../job-profile-stream/job-profile-stream-unchecked-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUncheckedUpdateWithoutJobProfilesInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUncheckedUpdateManyWithoutJob_familyNestedInput;
}
