import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateWithoutOrganizationInput } from './job-profile-organization-create-without-organization.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateOrConnectWithoutOrganizationInput } from './job-profile-organization-create-or-connect-without-organization.input';
import { JobProfileOrganizationUpsertWithWhereUniqueWithoutOrganizationInput } from './job-profile-organization-upsert-with-where-unique-without-organization.input';
import { JobProfileOrganizationCreateManyOrganizationInputEnvelope } from './job-profile-organization-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';
import { JobProfileOrganizationUpdateWithWhereUniqueWithoutOrganizationInput } from './job-profile-organization-update-with-where-unique-without-organization.input';
import { JobProfileOrganizationUpdateManyWithWhereWithoutOrganizationInput } from './job-profile-organization-update-many-with-where-without-organization.input';
import { JobProfileOrganizationScalarWhereInput } from './job-profile-organization-scalar-where.input';

@InputType()
export class JobProfileOrganizationUncheckedUpdateManyWithoutOrganizationNestedInput {
  @Field(() => [JobProfileOrganizationCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateWithoutOrganizationInput)
  create?: Array<JobProfileOrganizationCreateWithoutOrganizationInput>;

  @Field(() => [JobProfileOrganizationCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<JobProfileOrganizationCreateOrConnectWithoutOrganizationInput>;

  @Field(() => [JobProfileOrganizationUpsertWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationUpsertWithWhereUniqueWithoutOrganizationInput)
  upsert?: Array<JobProfileOrganizationUpsertWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => JobProfileOrganizationCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => JobProfileOrganizationCreateManyOrganizationInputEnvelope)
  createMany?: JobProfileOrganizationCreateManyOrganizationInputEnvelope;

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

  @Field(() => [JobProfileOrganizationUpdateWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationUpdateWithWhereUniqueWithoutOrganizationInput)
  update?: Array<JobProfileOrganizationUpdateWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => [JobProfileOrganizationUpdateManyWithWhereWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationUpdateManyWithWhereWithoutOrganizationInput)
  updateMany?: Array<JobProfileOrganizationUpdateManyWithWhereWithoutOrganizationInput>;

  @Field(() => [JobProfileOrganizationScalarWhereInput], { nullable: true })
  @Type(() => JobProfileOrganizationScalarWhereInput)
  deleteMany?: Array<JobProfileOrganizationScalarWhereInput>;
}
