import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutOrganizationInput } from './job-profile-update-without-organization.input';

@InputType()
export class JobProfileUpdateWithWhereUniqueWithoutOrganizationInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateWithoutOrganizationInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutOrganizationInput)
  data!: JobProfileUpdateWithoutOrganizationInput;
}
