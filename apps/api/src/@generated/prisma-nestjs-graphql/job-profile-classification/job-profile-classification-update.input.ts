import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput } from '../classification/classification-update-one-required-without-job-profiles-nested.input';
import { JobProfileUpdateOneRequiredWithoutClassificationsNestedInput } from '../job-profile/job-profile-update-one-required-without-classifications-nested.input';

@InputType()
export class JobProfileClassificationUpdateInput {
  @Field(() => ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  classification?: ClassificationUpdateOneRequiredWithoutJob_profilesNestedInput;

  @Field(() => JobProfileUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutClassificationsNestedInput;
}
