import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileClassificationMinAggregate {
  @Field(() => String, { nullable: true })
  classification_id?: string;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
