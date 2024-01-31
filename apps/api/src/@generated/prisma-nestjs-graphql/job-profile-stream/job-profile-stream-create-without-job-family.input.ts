import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamLinkCreateNestedManyWithoutStreamInput } from '../job-profile-stream-link/job-profile-stream-link-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamCreateWithoutJob_familyInput {
  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileStreamLinkCreateNestedManyWithoutStreamInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkCreateNestedManyWithoutStreamInput;
}
