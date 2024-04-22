import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileRoleTypeCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;
}
