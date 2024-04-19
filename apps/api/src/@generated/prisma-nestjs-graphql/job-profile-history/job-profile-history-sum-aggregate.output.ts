import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileHistorySumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => Int, { nullable: true })
  created_by?: number;

  @Field(() => Int, { nullable: true })
  updated_by?: number;

  @Field(() => Int, { nullable: true })
  deleted_by?: number;
}
