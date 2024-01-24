import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleCreateManyInput } from './job-profile-role-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileRoleArgs {
  @Field(() => [JobProfileRoleCreateManyInput], { nullable: false })
  @Type(() => JobProfileRoleCreateManyInput)
  data!: Array<JobProfileRoleCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
