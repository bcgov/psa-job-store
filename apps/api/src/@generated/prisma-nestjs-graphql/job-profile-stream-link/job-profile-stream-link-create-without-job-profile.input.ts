import { Field, InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateNestedOneWithoutJobProfilesInput } from '../job-profile-stream/job-profile-stream-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileStreamLinkCreateWithoutJobProfileInput {
  @Field(() => JobProfileStreamCreateNestedOneWithoutJobProfilesInput, { nullable: false })
  stream!: JobProfileStreamCreateNestedOneWithoutJobProfilesInput;
}
