import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
