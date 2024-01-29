import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutOrganizationsInput } from './job-profile-create-without-organizations.input';

@InputType()
export class JobProfileCreateOrConnectWithoutOrganizationsInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutOrganizationsInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutOrganizationsInput)
  create!: JobProfileCreateWithoutOrganizationsInput;
}
