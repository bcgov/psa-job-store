import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileUpdateOneRequiredWithoutStreamsNestedInput } from '../job-profile/job-profile-update-one-required-without-streams-nested.input';

@InputType()
export class JobProfileStreamLinkUpdateWithoutStreamInput {
  @Field(() => JobProfileUpdateOneRequiredWithoutStreamsNestedInput, { nullable: true })
  jobProfile?: JobProfileUpdateOneRequiredWithoutStreamsNestedInput;
}
