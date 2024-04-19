import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateWithoutJob_profileInput } from './job-profile-reports-to-create-without-job-profile.input';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

@InputType()
export class JobProfileReportsToCreateOrConnectWithoutJob_profileInput {
  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileReportsToCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateWithoutJob_profileInput)
  create!: JobProfileReportsToCreateWithoutJob_profileInput;
}
