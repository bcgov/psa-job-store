import { Field, InputType } from '@nestjs/graphql';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@InputType()
export class JobProfileRoleTypeRelationFilter {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  is?: JobProfileRoleTypeWhereInput;

  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  isNot?: JobProfileRoleTypeWhereInput;
}
