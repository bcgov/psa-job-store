import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleUpdateManyMutationInput } from './job-profile-role-update-many-mutation.input';
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
