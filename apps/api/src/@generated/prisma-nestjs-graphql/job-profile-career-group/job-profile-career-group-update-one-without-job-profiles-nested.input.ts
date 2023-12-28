import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCareerGroupCreateWithoutJob_profilesInput } from './job-profile-career-group-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput } from './job-profile-career-group-create-or-connect-without-job-profiles.input';
import { JobProfileCareerGroupUpsertWithoutJob_profilesInput } from './job-profile-career-group-upsert-without-job-profiles.input';
import { JobProfileCareerGroupWhereInput } from './job-profile-career-group-where.input';
import { Prisma } from '@prisma/client';
import { JobProfileCareerGroupWhereUniqueInput } from './job-profile-career-group-where-unique.input';
import { JobProfileCareerGroupUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-career-group-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class JobProfileCareerGroupUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => JobProfileCareerGroupCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileCareerGroupCreateWithoutJob_profilesInput)
  create?: JobProfileCareerGroupCreateWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileCareerGroupCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileCareerGroupUpsertWithoutJob_profilesInput)
  upsert?: JobProfileCareerGroupUpsertWithoutJob_profilesInput;

  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  disconnect?: JobProfileCareerGroupWhereInput;

  @Field(() => JobProfileCareerGroupWhereInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereInput)
  delete?: JobProfileCareerGroupWhereInput;

  @Field(() => JobProfileCareerGroupWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileCareerGroupWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileCareerGroupWhereUniqueInput, 'id'>;

  @Field(() => JobProfileCareerGroupUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileCareerGroupUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: JobProfileCareerGroupUpdateToOneWithWhereWithoutJob_profilesInput;
}
