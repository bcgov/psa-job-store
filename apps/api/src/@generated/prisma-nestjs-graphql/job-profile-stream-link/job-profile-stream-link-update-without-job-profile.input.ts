import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput } from '../job-profile-stream/job-profile-stream-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileStreamLinkUpdateWithoutJobProfileInput {
  @Field(() => JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput, { nullable: true })
  stream?: JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput;
}
