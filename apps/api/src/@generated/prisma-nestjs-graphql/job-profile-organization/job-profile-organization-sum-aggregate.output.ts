import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileOrganizationSumAggregate {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
