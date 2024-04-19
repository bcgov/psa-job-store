import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileReportsToAvgAggregate {
  @Field(() => Float, { nullable: true })
  job_profile_id?: number;
}
