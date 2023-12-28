import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileJobFamilyWhereUniqueInput } from './job-profile-job-family-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileJobFamilyCreateWithoutJob_profilesInput } from './job-profile-job-family-create-without-job-profiles.input';

@InputType()
export class JobProfileJobFamilyCreateOrConnectWithoutJob_profilesInput {
  @Field(() => JobProfileJobFamilyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileJobFamilyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileJobFamilyWhereUniqueInput, 'id'>;

  @Field(() => JobProfileJobFamilyCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => JobProfileJobFamilyCreateWithoutJob_profilesInput)
  create!: JobProfileJobFamilyCreateWithoutJob_profilesInput;
}
