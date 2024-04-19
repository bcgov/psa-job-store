import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileStreamCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  job_family_id!: number;

  @Field(() => Int, { nullable: false })
  name!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
