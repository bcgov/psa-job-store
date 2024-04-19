import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJobProfilesInput } from './job-profile-job-family-create-without-job-profiles.input';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';

@InputType()
export class JobProfileJobFamilyCreateOrConnectWithoutJobProfilesInput {
  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyCreateWithoutJobProfilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJobProfilesInput)
  create!: JobProfileJobFamilyCreateWithoutJobProfilesInput;
}
