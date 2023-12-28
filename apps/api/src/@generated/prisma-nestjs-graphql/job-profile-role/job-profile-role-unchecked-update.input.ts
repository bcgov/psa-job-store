import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';
import { JobProfileUncheckedUpdateManyWithoutRoleNestedInput } from '../job-profile/job-profile-unchecked-update-many-without-role-nested.input';

@InputType()
export class JobProfileRoleUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => JobProfileRoleType, { nullable: true })
  type?: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUncheckedUpdateManyWithoutRoleNestedInput, { nullable: true })
  job_profiles?: JobProfileUncheckedUpdateManyWithoutRoleNestedInput;
}
