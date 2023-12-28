import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileRole {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => JobProfileRoleType, { nullable: false })
  type!: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;
}
