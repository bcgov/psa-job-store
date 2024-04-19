import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileHistoryCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  json!: number;

  @Field(() => Int, { nullable: false })
  created_at!: number;

  @Field(() => Int, { nullable: false })
  created_by!: number;

  @Field(() => Int, { nullable: false })
  updated_at!: number;

  @Field(() => Int, { nullable: false })
  updated_by!: number;

  @Field(() => Int, { nullable: false })
  deleted_at!: number;

  @Field(() => Int, { nullable: false })
  deleted_by!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
