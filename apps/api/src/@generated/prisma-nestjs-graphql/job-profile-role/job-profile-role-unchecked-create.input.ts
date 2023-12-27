import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';
import { JobProfileUncheckedCreateNestedManyWithoutRoleInput } from '../job-profile/job-profile-unchecked-create-nested-many-without-role.input';

@InputType()
export class JobProfileRoleUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => JobProfileRoleType, { nullable: false })
  type!: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileUncheckedCreateNestedManyWithoutRoleInput, { nullable: true })
  job_profiles?: JobProfileUncheckedCreateNestedManyWithoutRoleInput;
}
