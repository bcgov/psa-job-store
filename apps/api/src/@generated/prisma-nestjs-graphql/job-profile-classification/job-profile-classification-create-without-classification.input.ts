import { Field, InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutClassificationsInput } from '../job-profile/job-profile-create-nested-one-without-classifications.input';

@InputType()
export class JobProfileClassificationCreateWithoutClassificationInput {
  @Field(() => JobProfileCreateNestedOneWithoutClassificationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutClassificationsInput;
}
