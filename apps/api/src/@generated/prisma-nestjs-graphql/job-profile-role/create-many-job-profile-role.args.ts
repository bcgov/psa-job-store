import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateManyInput } from './job-profile-role-create-many.input';

@ArgsType()
export class CreateManyJobProfileRoleArgs {
  @Field(() => [JobProfileRoleCreateManyInput], { nullable: false })
  @Type(() => JobProfileRoleCreateManyInput)
  data!: Array<JobProfileRoleCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
