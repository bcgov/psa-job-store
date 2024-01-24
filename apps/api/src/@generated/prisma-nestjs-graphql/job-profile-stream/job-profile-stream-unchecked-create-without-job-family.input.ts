import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput } from '../job-profile-stream-link/job-profile-stream-link-unchecked-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamUncheckedCreateWithoutJob_familyInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput;
}
