import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateWithoutJob_profileInput } from './job-profile-organization-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateOrConnectWithoutJob_profileInput } from './job-profile-organization-create-or-connect-without-job-profile.input';
import { JobProfileOrganizationCreateManyJob_profileInputEnvelope } from './job-profile-organization-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';

@InputType()
export class JobProfileOrganizationUncheckedCreateNestedManyWithoutJob_profileInput {
  @Field(() => [JobProfileOrganizationCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateWithoutJob_profileInput)
  create?: Array<JobProfileOrganizationCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileOrganizationCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileOrganizationCreateOrConnectWithoutJob_profileInput>;

  @Field(() => JobProfileOrganizationCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileOrganizationCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileOrganizationCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileOrganizationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>>;
}
