import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileReportsToMaxAggregateInput {
  @Field(() => Boolean, { nullable: true })
  classification_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
