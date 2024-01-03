import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PositionRequestCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  step!: number;

  @Field(() => Int, { nullable: false })
  reports_to_position_id!: number;

  @Field(() => Int, { nullable: false })
  department_id!: number;

  @Field(() => Int, { nullable: false })
  parent_job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  profile_json!: number;

  @Field(() => Int, { nullable: false })
  user_id!: number;

  @Field(() => Int, { nullable: false })
  title!: number;

  @Field(() => Int, { nullable: false })
  position_number!: number;

  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  classification_code!: number;

  @Field(() => Int, { nullable: false })
  submission_id!: number;

  @Field(() => Int, { nullable: false })
  status!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
