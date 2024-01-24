import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class LocationCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  peoplesoft_id!: number;

  @Field(() => Int, { nullable: false })
  code!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  effective_status!: number;

  @Field(() => Int, { nullable: false })
  effective_date!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
