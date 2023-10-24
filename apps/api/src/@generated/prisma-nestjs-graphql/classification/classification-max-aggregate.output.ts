import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class ClassificationMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  grid_id?: number;

  @Field(() => Int, { nullable: true })
  occupation_group_id?: number;
}
