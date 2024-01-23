import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionRequestAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  crm_id?: true;

  @Field(() => Boolean, { nullable: true })
  step?: true;

  @Field(() => Boolean, { nullable: true })
  parent_job_profile_id?: true;

  @Field(() => Boolean, { nullable: true })
  position_number?: true;
}
