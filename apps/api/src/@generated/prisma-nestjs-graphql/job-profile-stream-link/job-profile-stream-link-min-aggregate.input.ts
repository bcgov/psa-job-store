import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileStreamLinkMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  jobProfileId?: true;

  @Field(() => Boolean, { nullable: true })
  streamId?: true;
}
