import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  career_group_id?: number;

  @Field(() => Int, { nullable: true })
  family_id?: number;

  @Field(() => Int, { nullable: true })
  ministry_id?: number;

  @Field(() => Int, { nullable: true })
  parent_id?: number;

  @Field(() => Int, { nullable: true })
  role_id?: number;

  @Field(() => Int, { nullable: true })
  number?: number;
}
