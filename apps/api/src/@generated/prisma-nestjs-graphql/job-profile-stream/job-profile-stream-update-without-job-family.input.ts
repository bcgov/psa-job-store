import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkUpdateManyWithoutStreamNestedInput } from '../job-profile-stream-link/job-profile-stream-link-update-many-without-stream-nested.input';

@InputType()
export class JobProfileStreamUpdateWithoutJob_familyInput {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileStreamLinkUpdateManyWithoutStreamNestedInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkUpdateManyWithoutStreamNestedInput;
}
