import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateInput } from './job-profile-role-type-create.input';

@ArgsType()
export class CreateOneJobProfileRoleTypeArgs {
  @Field(() => JobProfileRoleTypeCreateInput, { nullable: false })
  @Type(() => JobProfileRoleTypeCreateInput)
  data!: JobProfileRoleTypeCreateInput;
}
