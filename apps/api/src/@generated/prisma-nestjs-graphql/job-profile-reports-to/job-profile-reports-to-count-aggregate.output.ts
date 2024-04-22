import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileReportsToCountAggregate {
  @Field(() => Int, { nullable: false })
  classification_id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Int, { nullable: false })
  _all!: number;
}
