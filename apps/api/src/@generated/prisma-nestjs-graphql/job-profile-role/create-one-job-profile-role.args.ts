import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleCreateInput } from './job-profile-role-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileRoleArgs {
  @Field(() => JobProfileRoleCreateInput, { nullable: false })
  @Type(() => JobProfileRoleCreateInput)
  data!: JobProfileRoleCreateInput;
}
