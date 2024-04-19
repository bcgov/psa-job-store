import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateInput } from './job-profile-role-create.input';

@ArgsType()
export class CreateOneJobProfileRoleArgs {
  @Field(() => JobProfileRoleCreateInput, { nullable: false })
  @Type(() => JobProfileRoleCreateInput)
  data!: JobProfileRoleCreateInput;
}
