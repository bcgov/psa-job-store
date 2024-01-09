import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationSumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
