import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  streamId?: true;
}
