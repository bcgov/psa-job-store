import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class GridSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [Int], { nullable: true })
  steps?: Array<number>;
}
