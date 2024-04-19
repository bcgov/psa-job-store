import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileOrganizationMinAggregate {
  @Field(() => String, { nullable: true })
  organization_id?: string;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
