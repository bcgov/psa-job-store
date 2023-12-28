import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutClassificationsInput } from '../job-profile/job-profile-create-nested-one-without-classifications.input';

@InputType()
export class JobProfileClassificationCreateWithoutClassificationInput {
  @Field(() => JobProfileCreateNestedOneWithoutClassificationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutClassificationsInput;
}
