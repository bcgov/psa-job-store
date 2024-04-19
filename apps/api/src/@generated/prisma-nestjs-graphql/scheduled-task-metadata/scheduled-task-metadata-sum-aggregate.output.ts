import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ScheduledTaskMetadataSumAggregate {
  @Field(() => Int, { nullable: true })
  frequency?: number;
}
