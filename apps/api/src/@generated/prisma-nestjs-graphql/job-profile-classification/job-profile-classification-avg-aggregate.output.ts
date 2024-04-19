import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileClassificationAvgAggregate {
  @Field(() => Float, { nullable: true })
  job_profile_id?: number;
}
