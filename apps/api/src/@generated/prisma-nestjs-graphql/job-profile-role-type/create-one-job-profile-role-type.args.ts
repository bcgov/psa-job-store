import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleTypeCreateInput } from './job-profile-role-type-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeCreateInput, { nullable: false })
  @Type(() => JobProfileRoleTypeCreateInput)
  data!: JobProfileRoleTypeCreateInput;
}
