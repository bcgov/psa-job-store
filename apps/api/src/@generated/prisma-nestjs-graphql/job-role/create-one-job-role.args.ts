import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleCreateInput } from './job-role-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobRoleArgs {
  @Field(() => JobRoleCreateInput, { nullable: false })
  @Type(() => JobRoleCreateInput)
  data!: JobRoleCreateInput;
}
