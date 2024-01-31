import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateWithoutJob_profileInput } from './job-profile-organization-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateOrConnectWithoutJob_profileInput } from './job-profile-organization-create-or-connect-without-job-profile.input';
import { JobProfileOrganizationUpsertWithWhereUniqueWithoutJob_profileInput } from './job-profile-organization-upsert-with-where-unique-without-job-profile.input';
import { JobProfileOrganizationCreateManyJob_profileInputEnvelope } from './job-profile-organization-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { JobProfileOrganizationUpdateWithWhereUniqueWithoutJob_profileInput } from './job-profile-organization-update-with-where-unique-without-job-profile.input';
import { JobProfileOrganizationUpdateManyWithWhereWithoutJob_profileInput } from './job-profile-organization-update-many-with-where-without-job-profile.input';
import { JobProfileOrganizationScalarWhereInput } from './job-profile-organization-scalar-where.input';

@InputType()
export class JobProfileOrganizationUpdateManyWithoutJob_profileNestedInput {
  @Field(() => [JobProfileOrganizationCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateWithoutJob_profileInput)
  create?: Array<JobProfileOrganizationCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileOrganizationCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileOrganizationCreateOrConnectWithoutJob_profileInput>;

  @Field(() => [JobProfileOrganizationUpsertWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationUpsertWithWhereUniqueWithoutJob_profileInput)
  upsert?: Array<JobProfileOrganizationUpsertWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => JobProfileOrganizationCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileOrganizationCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileOrganizationCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileOrganizationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>>;

  @Field(() => [JobProfileOrganizationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>>;

  @Field(() => [JobProfileOrganizationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>>;

  @Field(() => [JobProfileOrganizationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>>;

  @Field(() => [JobProfileOrganizationUpdateWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationUpdateWithWhereUniqueWithoutJob_profileInput)
  update?: Array<JobProfileOrganizationUpdateWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => [JobProfileOrganizationUpdateManyWithWhereWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationUpdateManyWithWhereWithoutJob_profileInput)
  updateMany?: Array<JobProfileOrganizationUpdateManyWithWhereWithoutJob_profileInput>;

  @Field(() => [JobProfileOrganizationScalarWhereInput], { nullable: true })
  @Type(() => JobProfileOrganizationScalarWhereInput)
  deleteMany?: Array<JobProfileOrganizationScalarWhereInput>;
}
