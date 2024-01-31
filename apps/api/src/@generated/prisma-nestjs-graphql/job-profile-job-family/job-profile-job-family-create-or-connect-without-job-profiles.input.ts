import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJobProfilesInput } from './job-profile-job-family-create-without-job-profiles.input';

@InputType()
export class JobProfileJobFamilyCreateOrConnectWithoutJobProfilesInput {
  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyCreateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfilesInput)
  create!: JobProfileJobFamilyCreateWithoutJobProfilesInput;
}
