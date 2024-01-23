import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class PositionRequestSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  crm_id?: number;

  @Field(() => Int, { nullable: true })
  step?: number;

  @Field(() => Int, { nullable: true })
  parent_job_profile_id?: number;

  @Field(() => Int, { nullable: true })
  position_number?: number;
}
