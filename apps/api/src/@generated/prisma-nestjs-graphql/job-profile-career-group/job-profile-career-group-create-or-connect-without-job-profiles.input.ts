import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupCreateWithoutJob_profilesInput } from './job-profile-career-group-create-without-job-profiles.input';

@InputType()
export class JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput {
  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileCareerGroupWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCareerGroupCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileCareerGroupCreateWithoutJob_profilesInput)
  create!: JobProfileCareerGroupCreateWithoutJob_profilesInput;
}
