import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileHistoryMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;

  @Field(() => Boolean, { nullable: true })
  created_at?: true;

  @Field(() => Boolean, { nullable: true })
  created_by?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  updated_by?: true;

  @Field(() => Boolean, { nullable: true })
  deleted_at?: true;

  @Field(() => Boolean, { nullable: true })
  deleted_by?: true;
}
