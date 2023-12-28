import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileJobFamilyCreateWithoutJob_profilesInput } from './job-profile-job-family-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput } from './job-profile-job-family-create-or-connect-without-job-profiles.input';
import { JobProfileJobFamilyUpsertWithoutJob_profilesInput } from './job-profile-job-family-upsert-without-job-profiles.input';
import { JobProfileJobFamilyWhereInput } from './job-profile-job-family-where.input';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { JobProfileJobFamilyUpdateToOneWithWhereWithoutJob_profilesInput } from './job-profile-job-family-update-to-one-with-where-without-job-profiles.input';

@InputType()
export class JobProfileJobFamilyUpdateOneWithoutJob_profilesNestedInput {
  @Field(() => JobProfileJobFamilyCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateWithoutJob_profilesInput)
  create?: JobProfileJobFamilyCreateWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyUpsertWithoutJob_profilesInput)
  upsert?: JobProfileJobFamilyUpsertWithoutJob_profilesInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  disconnect?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyWhereInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereInput)
  delete?: JobProfileJobFamilyWhereInput;

  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => JobProfileJobFamilyUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: JobProfileJobFamilyUpdateToOneWithWhereWithoutJob_profilesInput;
}
