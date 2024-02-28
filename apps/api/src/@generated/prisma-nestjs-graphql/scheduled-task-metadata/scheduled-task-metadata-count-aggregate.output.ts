import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ScheduledTaskMetadataCountAggregate {
  @Field(() => Int, { nullable: false })
  task!: number;

  @Field(() => Int, { nullable: false })
  frequency!: number;

  @Field(() => Int, { nullable: false })
  last_run_at!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
