import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToUpdateWithoutJob_profileInput } from './job-profile-reports-to-update-without-job-profile.input';
import { JobProfileReportsToCreateWithoutJob_profileInput } from './job-profile-reports-to-create-without-job-profile.input';

@InputType()
export class JobProfileReportsToUpsertWithWhereUniqueWithoutJob_profileInput {
  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileReportsToUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileReportsToUpdateWithoutJob_profileInput)
  update!: JobProfileReportsToUpdateWithoutJob_profileInput;

  @Field(() => JobProfileReportsToCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateWithoutJob_profileInput)
  create!: JobProfileReportsToCreateWithoutJob_profileInput;
}
