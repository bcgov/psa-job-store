import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleTypeUpdateWithoutJob_profilesInput } from './job-profile-role-type-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeCreateWithoutJob_profilesInput } from './job-profile-role-type-create-without-job-profiles.input';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';

@InputType()
export class JobProfileRoleTypeUpsertWithoutJob_profilesInput {
  @Field(() => JobProfileRoleTypeUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleTypeUpdateWithoutJob_profilesInput)
  update!: JobProfileRoleTypeUpdateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleTypeCreateWithoutJob_profilesInput)
  create!: JobProfileRoleTypeCreateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;
}
