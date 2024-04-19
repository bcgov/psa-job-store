import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationMinAggregateInput {
  @Field(() => Boolean, { nullable: true })
  organization_id?: true;

  @Field(() => Boolean, { nullable: true })
  job_profile_id?: true;
}
