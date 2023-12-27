import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';
import { JobProfileUpdateManyWithoutRoleNestedInput } from '../job-profile/job-profile-update-many-without-role-nested.input';

@InputType()
export class JobProfileRoleUpdateInput {
  @Field(() => JobProfileRoleType, { nullable: true })
  type?: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => JobProfileUpdateManyWithoutRoleNestedInput, { nullable: true })
  job_profiles?: JobProfileUpdateManyWithoutRoleNestedInput;
}
