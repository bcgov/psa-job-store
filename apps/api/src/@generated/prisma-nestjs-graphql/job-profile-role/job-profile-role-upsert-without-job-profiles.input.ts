import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleUpdateWithoutJob_profilesInput } from './job-profile-role-update-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileRoleCreateWithoutJob_profilesInput } from './job-profile-role-create-without-job-profiles.input';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';

@InputType()
export class JobProfileRoleUpsertWithoutJob_profilesInput {
  @Field(() => JobProfileRoleUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleUpdateWithoutJob_profilesInput)
  update!: JobProfileRoleUpdateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileRoleCreateWithoutJob_profilesInput)
  create!: JobProfileRoleCreateWithoutJob_profilesInput;

  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;
}
