import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  frequency?: true;
}
