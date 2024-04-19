import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkUncheckedUpdateManyInput {
  @Field(() => Int, { nullable: true })
  jobProfileId?: number;

  @Field(() => Int, { nullable: true })
  streamId?: number;
}
