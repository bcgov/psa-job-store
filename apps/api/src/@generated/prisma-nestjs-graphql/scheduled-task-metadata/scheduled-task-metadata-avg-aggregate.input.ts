import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  frequency?: true;
}
