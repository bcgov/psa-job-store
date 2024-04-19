import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeUpdateManyMutationInput } from './job-profile-role-type-update-many-mutation.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@ArgsType()
export class UpdateManyJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileRoleTypeUpdateManyMutationInput)
  data!: JobProfileRoleTypeUpdateManyMutationInput;

  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;
}
