import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutStreamsInput } from '../job-profile/job-profile-create-nested-one-without-streams.input';
import { JobProfileStreamCreateNestedOneWithoutJobProfilesInput } from '../job-profile-stream/job-profile-stream-create-nested-one-without-job-profiles.input';

@InputType()
export class JobProfileStreamLinkCreateInput {
  @Field(() => JobProfileCreateNestedOneWithoutStreamsInput, { nullable: false })
  jobProfile!: JobProfileCreateNestedOneWithoutStreamsInput;

  @Field(() => JobProfileStreamCreateNestedOneWithoutJobProfilesInput, { nullable: false })
  stream!: JobProfileStreamCreateNestedOneWithoutJobProfilesInput;
}
