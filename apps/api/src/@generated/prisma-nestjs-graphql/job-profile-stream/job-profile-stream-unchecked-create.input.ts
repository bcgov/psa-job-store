import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput } from '../job-profile-stream-link/job-profile-stream-link-unchecked-create-nested-many-without-stream.input';

@InputType()
export class JobProfileStreamUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput, { nullable: true })
  jobProfiles?: JobProfileStreamLinkUncheckedCreateNestedManyWithoutStreamInput;
}
