import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileMinimumRequirementsCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  requirement!: number;

  @Field(() => Int, { nullable: false })
  grade!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
