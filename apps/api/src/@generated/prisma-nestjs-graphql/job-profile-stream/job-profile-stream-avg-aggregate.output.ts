import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;

  @Field(() => Float, { nullable: true })
  job_family_id?: number;
}
