import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileContextCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;

  @Field(() => Boolean, { nullable: true })
  description?: true;

  @Field(() => Boolean, { nullable: true })
  _all?: true;
}
