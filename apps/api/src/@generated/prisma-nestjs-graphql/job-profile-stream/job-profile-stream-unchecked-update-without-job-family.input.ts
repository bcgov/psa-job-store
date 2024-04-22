import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileStreamLinkUncheckedUpdateManyWithoutStreamNestedInput } from '../job-profile-stream-link/job-profile-stream-link-unchecked-update-many-without-stream-nested.input';

@InputType()
export class JobProfileStreamUncheckedUpdateWithoutJob_familyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileStreamLinkUncheckedUpdateManyWithoutStreamNestedInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkUncheckedUpdateManyWithoutStreamNestedInput;
}
