import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileContextMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;

  @Field(() => String, { nullable: true })
  description?: string;
}
