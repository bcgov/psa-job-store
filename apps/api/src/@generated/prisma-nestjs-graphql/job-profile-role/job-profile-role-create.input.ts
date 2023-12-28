import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';
import { JobProfileCreateNestedManyWithoutRoleInput } from '../job-profile/job-profile-create-nested-many-without-role.input';

@InputType()
export class JobProfileRoleCreateInput {
  @Field(() => JobProfileRoleType, { nullable: false })
  type!: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileCreateNestedManyWithoutRoleInput, { nullable: true })
  job_profiles?: JobProfileCreateNestedManyWithoutRoleInput;
}
