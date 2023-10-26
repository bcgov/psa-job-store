import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class JobProfileCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  category_id!: number;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  family_id!: number;

  @Field(() => Int, { nullable: false })
  ministry_id!: number;

  @Field(() => Int, { nullable: false })
  role_id!: number;

  @Field(() => Int, { nullable: false })
  stream!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  number!: number;

  @Field(() => Int, { nullable: false })
  context!: number;

  @Field(() => Int, { nullable: false })
  overview!: number;

  @Field(() => Int, { nullable: false })
  accountabilities_required!: number;

  @Field(() => Int, { nullable: false })
  accountabilities_optional!: number;

  @Field(() => Int, { nullable: false })
  requirements!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
