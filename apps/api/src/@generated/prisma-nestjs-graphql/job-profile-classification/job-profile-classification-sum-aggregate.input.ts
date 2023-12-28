import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileClassificationSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
