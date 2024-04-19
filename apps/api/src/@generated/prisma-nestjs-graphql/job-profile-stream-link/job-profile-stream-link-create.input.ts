import { Field, InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateNestedOneWithoutJobProfilesInput } from '../job-profile-stream/job-profile-stream-create-nested-one-without-job-profiles.input';
import { JobProfileCreateNestedOneWithoutStreamsInput } from '../job-profile/job-profile-create-nested-one-without-streams.input';

@InputType()
export class JobProfileStreamLinkCreateInput {
  @Field(() => JobProfileCreateNestedOneWithoutStreamsInput, { nullable: false })
  jobProfile!: JobProfileCreateNestedOneWithoutStreamsInput;

  @Field(() => JobProfileStreamCreateNestedOneWithoutJobProfilesInput, { nullable: false })
  stream!: JobProfileStreamCreateNestedOneWithoutJobProfilesInput;
}
