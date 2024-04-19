import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedCreateInput {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  streamId!: number;
}
