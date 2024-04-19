import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileScopeCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;
}
