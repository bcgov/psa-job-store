import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileRoleArgs {
  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;
}
