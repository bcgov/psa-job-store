import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileHistoryAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  job_profile_id?: number;

  @Field(() => Float, { nullable: true })
  created_by?: number;

  @Field(() => Float, { nullable: true })
  updated_by?: number;

  @Field(() => Float, { nullable: true })
  deleted_by?: number;
}
