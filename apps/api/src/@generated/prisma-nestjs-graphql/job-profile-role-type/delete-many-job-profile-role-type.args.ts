import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@ArgsType()
export class DeleteManyJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;
}
