import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
