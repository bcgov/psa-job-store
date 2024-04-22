import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClassificationCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;

  @Field(() => Int, { nullable: false })
  reportees?: number;
}
