import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ScheduledTaskMetadataSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  frequency?: true;
}
