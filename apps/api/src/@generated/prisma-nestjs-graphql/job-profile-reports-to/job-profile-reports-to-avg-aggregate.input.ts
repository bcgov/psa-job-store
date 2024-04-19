import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
