import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileContextAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  job_profile_id?: number;
}
