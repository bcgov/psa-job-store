import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamUpdateManyWithoutJob_familyNestedInput } from '../job-profile-stream/job-profile-stream-update-many-without-job-family-nested.input';

@InputType()
export class JobProfileJobFamilyUpdateWithoutJob_profilesInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileStreamUpdateManyWithoutJob_familyNestedInput, { nullable: true })
  JobProfileStream?: JobProfileStreamUpdateManyWithoutJob_familyNestedInput;
}
