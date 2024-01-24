import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateNestedOneWithoutStreamsInput } from '../job-profile/job-profile-create-nested-one-without-streams.input';

@InputType()
export class JobProfileStreamLinkCreateWithoutStreamInput {
  @Field(() => JobProfileCreateNestedOneWithoutStreamsInput, { nullable: false })
  jobProfile!: JobProfileCreateNestedOneWithoutStreamsInput;
}
