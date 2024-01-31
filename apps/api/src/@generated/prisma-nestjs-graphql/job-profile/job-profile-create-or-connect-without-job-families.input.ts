import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutJobFamiliesInput } from './job-profile-create-without-job-families.input';

@InputType()
export class JobProfileCreateOrConnectWithoutJobFamiliesInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutJobFamiliesInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutJobFamiliesInput)
  create!: JobProfileCreateWithoutJobFamiliesInput;
}
