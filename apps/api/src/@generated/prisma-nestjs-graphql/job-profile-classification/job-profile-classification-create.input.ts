import { Field, InputType } from '@nestjs/graphql';
import { ClassificationCreateNestedOneWithoutJob_profilesInput } from '../classification/classification-create-nested-one-without-job-profiles.input';
import { JobProfileCreateNestedOneWithoutClassificationsInput } from '../job-profile/job-profile-create-nested-one-without-classifications.input';

@InputType()
export class JobProfileClassificationCreateInput {
  @Field(() => ClassificationCreateNestedOneWithoutJob_profilesInput, { nullable: false })
  classification!: ClassificationCreateNestedOneWithoutJob_profilesInput;

  @Field(() => JobProfileCreateNestedOneWithoutClassificationsInput, { nullable: false })
  job_profile!: JobProfileCreateNestedOneWithoutClassificationsInput;
}
