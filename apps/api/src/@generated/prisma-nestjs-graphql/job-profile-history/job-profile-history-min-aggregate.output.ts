import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileHistoryMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => Date, { nullable: true })
  created_at?: Date | string;

  @Field(() => Int, { nullable: true })
  created_by?: number;

  @Field(() => Date, { nullable: true })
  updated_at?: Date | string;

  @Field(() => Int, { nullable: true })
  updated_by?: number;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => Int, { nullable: true })
  deleted_by?: number;
}
