import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduledTaskMetadataAvgAggregate {
  @Field(() => Float, { nullable: true })
  frequency?: number;
}
