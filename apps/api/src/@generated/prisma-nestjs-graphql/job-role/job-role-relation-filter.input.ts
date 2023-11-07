import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';

@InputType()
export class JobRoleRelationFilter {
  @Field(() => JobRoleWhereInput, { nullable: true })
  is?: JobRoleWhereInput;

  @Field(() => JobRoleWhereInput, { nullable: true })
  isNot?: JobRoleWhereInput;
}
