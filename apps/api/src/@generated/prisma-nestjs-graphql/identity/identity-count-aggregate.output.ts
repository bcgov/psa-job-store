import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class IdentityCountAggregate {
  @Field(() => Int, { nullable: false })
  sub!: number;

  @Field(() => Int, { nullable: false })
  identity_provider!: number;

  @Field(() => Int, { nullable: false })
  user_id!: number;

  @Field(() => Int, { nullable: false })
  created_at!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  deleted_at!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
