import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobRoleArgs {
  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;
}
