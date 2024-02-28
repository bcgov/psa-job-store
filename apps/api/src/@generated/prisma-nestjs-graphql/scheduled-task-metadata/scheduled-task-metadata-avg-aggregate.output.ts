import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ScheduledTaskMetadataAvgAggregate {
  @Field(() => Float, { nullable: true })
  frequency?: number;
}
