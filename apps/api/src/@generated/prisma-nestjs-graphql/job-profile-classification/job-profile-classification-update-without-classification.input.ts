import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutClassificationsNestedInput } from '../job-profile/job-profile-update-one-required-without-classifications-nested.input';

@InputType()
export class JobProfileClassificationUpdateWithoutClassificationInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutClassificationsNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutClassificationsNestedInput;
}
