import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutOrganizationInput } from './job-profile-create-without-organization.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutOrganizationInput } from './job-profile-create-or-connect-without-organization.input';
import { JobProfileUpsertWithWhereUniqueWithoutOrganizationInput } from './job-profile-upsert-with-where-unique-without-organization.input';
import { JobProfileCreateManyOrganizationInputEnvelope } from './job-profile-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateWithWhereUniqueWithoutOrganizationInput } from './job-profile-update-with-where-unique-without-organization.input';
import { JobProfileUpdateManyWithWhereWithoutOrganizationInput } from './job-profile-update-many-with-where-without-organization.input';
import { JobProfileScalarWhereInput } from './job-profile-scalar-where.input';

@InputType()
export class JobProfileUpdateManyWithoutOrganizationNestedInput {
  @Field(() => [JobProfileCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutOrganizationInput)
  create?: Array<JobProfileCreateWithoutOrganizationInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutOrganizationInput>;

  @Field(() => [JobProfileUpsertWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileUpsertWithWhereUniqueWithoutOrganizationInput)
  upsert?: Array<JobProfileUpsertWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => JobProfileCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyOrganizationInputEnvelope)
  createMany?: JobProfileCreateManyOrganizationInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;

  @Field(() => [JobProfileUpdateWithWhereUniqueWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileUpdateWithWhereUniqueWithoutOrganizationInput)
  update?: Array<JobProfileUpdateWithWhereUniqueWithoutOrganizationInput>;

  @Field(() => [JobProfileUpdateManyWithWhereWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileUpdateManyWithWhereWithoutOrganizationInput)
  updateMany?: Array<JobProfileUpdateManyWithWhereWithoutOrganizationInput>;

  @Field(() => [JobProfileScalarWhereInput], { nullable: true })
  @Type(() => JobProfileScalarWhereInput)
  deleteMany?: Array<JobProfileScalarWhereInput>;
}
