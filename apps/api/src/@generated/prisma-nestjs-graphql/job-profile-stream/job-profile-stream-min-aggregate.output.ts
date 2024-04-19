import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamMinAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => Int, { nullable: true })
  job_family_id?: number;

  @Field(() => String, { nullable: true })
  name?: string;
}
