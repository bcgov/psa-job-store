import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  streamId?: true;
}
