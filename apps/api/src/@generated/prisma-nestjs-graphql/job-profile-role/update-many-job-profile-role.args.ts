import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleUpdateManyMutationInput } from './job-profile-role-update-many-mutation.input';
import { Type } from 'class-transformer';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

@ArgsType()
export class UpdateManyJobProfileRoleArgs {
  @Field(() => JobProfileRoleUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileRoleUpdateManyMutationInput)
  data!: JobProfileRoleUpdateManyMutationInput;

  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;
}
