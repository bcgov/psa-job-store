import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';

@InputType()
export class JobProfileRoleUpdateWithoutJob_profilesInput {
  @Field(() => JobProfileRoleType, { nullable: true })
  type?: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: true })
  name?: string;
}
