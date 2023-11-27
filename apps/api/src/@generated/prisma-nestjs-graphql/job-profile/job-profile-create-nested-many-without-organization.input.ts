import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutOrganizationInput } from './job-profile-create-without-organization.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutOrganizationInput } from './job-profile-create-or-connect-without-organization.input';
import { JobProfileCreateManyOrganizationInputEnvelope } from './job-profile-create-many-organization-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedManyWithoutOrganizationInput {
  @Field(() => [JobProfileCreateWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutOrganizationInput)
  create?: Array<JobProfileCreateWithoutOrganizationInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutOrganizationInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutOrganizationInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutOrganizationInput>;

  @Field(() => JobProfileCreateManyOrganizationInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyOrganizationInputEnvelope)
  createMany?: JobProfileCreateManyOrganizationInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
