import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class ClassificationAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  grid_id?: number;

  @Field(() => Float, { nullable: true })
  occupation_group_id?: number;
}
