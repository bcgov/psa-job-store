import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;
}
