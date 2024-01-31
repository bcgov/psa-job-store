import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutStreamsNestedInput } from '../job-profile/job-profile-update-one-required-without-streams-nested.input';
import { JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput } from '../job-profile-stream/job-profile-stream-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileStreamLinkUpdateInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutStreamsNestedInput, { nullable: true })
  jobProfile?: JobProfileUpdateOneRequiredWithoutStreamsNestedInput;

  @Field(() => JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput, { nullable: true })
  stream?: JobProfileStreamUpdateOneRequiredWithoutJobProfilesNestedInput;
}
