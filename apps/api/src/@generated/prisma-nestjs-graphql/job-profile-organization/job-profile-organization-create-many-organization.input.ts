import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationCreateManyOrganizationInput {
  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
