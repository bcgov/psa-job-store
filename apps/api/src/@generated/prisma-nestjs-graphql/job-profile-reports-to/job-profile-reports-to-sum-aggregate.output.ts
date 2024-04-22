import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileReportsToSumAggregate {
  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
