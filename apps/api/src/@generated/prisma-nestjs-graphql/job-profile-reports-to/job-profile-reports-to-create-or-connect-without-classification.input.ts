import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateWithoutClassificationInput } from './job-profile-reports-to-create-without-classification.input';

@InputType()
export class JobProfileReportsToCreateOrConnectWithoutClassificationInput {
  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileReportsToCreateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateWithoutClassificationInput)
  create!: JobProfileReportsToCreateWithoutClassificationInput;
}
