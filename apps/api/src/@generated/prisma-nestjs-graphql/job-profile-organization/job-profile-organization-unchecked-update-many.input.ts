import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileOrganizationUncheckedUpdateManyInput {
  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
