import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CommentCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  author_id!: number;

  @Field(() => Int, { nullable: false })
  record_id!: number;

  @Field(() => Int, { nullable: false })
  record_type!: number;

  @Field(() => Int, { nullable: false })
  text!: number;

  @Field(() => Int, { nullable: false })
  created_at!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  deleted_at!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
