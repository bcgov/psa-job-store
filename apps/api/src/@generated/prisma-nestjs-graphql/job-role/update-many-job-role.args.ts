import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleUpdateManyMutationInput } from './job-role-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobRoleWhereInput } from './job-role-where.input';

@ArgsType()
export class UpdateManyJobRoleArgs {
  @Field(() => JobRoleUpdateManyMutationInput, { nullable: false })
  @Type(() => JobRoleUpdateManyMutationInput)
  data!: JobRoleUpdateManyMutationInput;

  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;
}
