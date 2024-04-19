import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationCreateManyInput {
  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;
}
