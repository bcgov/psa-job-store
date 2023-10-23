import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class MinistryAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
