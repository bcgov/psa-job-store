import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PositionRequestCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  step?: true;

  @Field(() => Boolean, { nullable: true })
  reports_to_position_id?: true;

  @Field(() => Boolean, { nullable: true })
  parent_job_profile_id?: true;

  @Field(() => Boolean, { nullable: true })
  profile_json?: true;

  @Field(() => Boolean, { nullable: true })
  user_id?: true;

  @Field(() => Boolean, { nullable: true })
  title?: true;

  @Field(() => Boolean, { nullable: true })
  position_number?: true;

  @Field(() => Boolean, { nullable: true })
  classification_id?: true;

  @Field(() => Boolean, { nullable: true })
  classification_code?: true;

  @Field(() => Boolean, { nullable: true })
  submission_id?: true;

  @Field(() => Boolean, { nullable: true })
  status?: true;

  @Field(() => Boolean, { nullable: true })
  updated_at?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
