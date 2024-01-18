import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;
}
