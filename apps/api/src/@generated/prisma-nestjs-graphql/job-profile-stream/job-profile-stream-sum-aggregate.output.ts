import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamSumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_family_id?: number;
}
