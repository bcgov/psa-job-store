import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PositionCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  department_id!: number;

  @Field(() => Int, { nullable: false })
  organization_id!: number;

  @Field(() => Int, { nullable: false })
  supervisor_id!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  job_profile_number!: number;

  @Field(() => Int, { nullable: false })
  is_empty!: number;

  @Field(() => Int, { nullable: false })
  is_vacant!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
