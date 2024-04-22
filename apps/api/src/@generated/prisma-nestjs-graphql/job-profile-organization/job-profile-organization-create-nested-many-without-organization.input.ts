import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateManyOrganizationInputEnvelope } from './job-profile-organization-create-many-organization-input-envelope.input';
import { JobProfileOrganizationCreateOrConnectWithoutOrganizationInput } from './job-profile-organization-create-or-connect-without-organization.input';
import { JobProfileOrganizationCreateWithoutOrganizationInput } from './job-profile-organization-create-without-organization.input';
import { JobProfileOrganizationWhereUniqueInput } from './job-profile-organization-where-unique.input';

@InputType()
export class JobProfileOrganizationCreateNestedManyWithoutOrganizationInput {
  @Field(() => [JobProfileOrganizationCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateWithoutOrganizationInput)
  create?: Array<JobProfileOrganizationCreateWithoutOrganizationInput>;

  @Field(() => [JobProfileOrganizationCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileOrganizationCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<JobProfileOrganizationCreateOrConnectWithoutOrganizationInput>;

  @Field(() => JobProfileOrganizationCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => JobProfileOrganizationCreateManyOrganizationInputEnvelope)
  createMany?: JobProfileOrganizationCreateManyOrganizationInputEnvelope;

  @Field(() => [JobProfileOrganizationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileOrganizationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileOrganizationWhereUniqueInput, 'organization_id_job_profile_id'>>;
}
