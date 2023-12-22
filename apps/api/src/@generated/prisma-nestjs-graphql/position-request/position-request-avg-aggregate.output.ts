import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';

@ObjectType()
export class PositionRequestAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  step?: number;

  @Field(() => Float, { nullable: true })
  reports_to_position_id?: number;

  @Field(() => Float, { nullable: true })
  parent_job_profile_id?: number;

  @Field(() => Float, { nullable: true })
  position_number?: number;
}
