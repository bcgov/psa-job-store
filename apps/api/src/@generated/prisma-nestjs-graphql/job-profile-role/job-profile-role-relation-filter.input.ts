import { Field, InputType } from '@nestjs/graphql';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

@InputType()
export class JobProfileRoleRelationFilter {
  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  is?: JobProfileRoleWhereInput;

  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  isNot?: JobProfileRoleWhereInput;
}
