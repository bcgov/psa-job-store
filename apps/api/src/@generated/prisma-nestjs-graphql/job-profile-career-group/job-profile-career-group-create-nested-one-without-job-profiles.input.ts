import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCareerGroupCreateWithoutJob_profilesInput } from './job-profile-career-group-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput } from './job-profile-career-group-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';

@InputType()
export class JobProfileCareerGroupCreateNestedOneWithoutJob_profilesInput {
  @Field(() => JobProfileCareerGroupCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileCareerGroupCreateWithoutJob_profilesInput)
  create?: JobProfileCareerGroupCreateWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;
}
