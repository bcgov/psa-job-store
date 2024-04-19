import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateManyInput } from './job-profile-role-type-create-many.input';

@ArgsType()
export class CreateManyJobProfileRoleTypeArgs {
  @Field(() => [JobProfileRoleTypeCreateManyInput], { nullable: false })
  @Type(() => JobProfileRoleTypeCreateManyInput)
  data!: Array<JobProfileRoleTypeCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
