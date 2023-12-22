import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutOrganizationInput } from './job-profile-update-without-organization.input';
import { JobProfileCreateWithoutOrganizationInput } from './job-profile-create-without-organization.input';

@InputType()
export class JobProfileUpsertWithWhereUniqueWithoutOrganizationInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOrganizationInput)
  update!: JobProfileUpdateWithoutOrganizationInput;

  @Field(() => JobProfileCreateWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOrganizationInput)
  create!: JobProfileCreateWithoutOrganizationInput;
}
