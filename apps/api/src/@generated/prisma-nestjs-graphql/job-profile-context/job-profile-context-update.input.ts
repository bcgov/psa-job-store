import { Field, InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutContextNestedInput } from '../job-profile/job-profile-update-one-required-without-context-nested.input';

@InputType()
export class JobProfileContextUpdateInput {
  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileUpdateOneRequiredWithoutContextNestedInput, { nullable: true })
  job_profile?: JobProfileUpdateOneRequiredWithoutContextNestedInput;
}
