import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CareerGroupSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
