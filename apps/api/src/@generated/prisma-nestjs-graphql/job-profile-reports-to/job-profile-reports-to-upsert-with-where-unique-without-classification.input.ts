import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateWithoutClassificationInput } from './job-profile-reports-to-create-without-classification.input';
import { JobProfileReportsToUpdateWithoutClassificationInput } from './job-profile-reports-to-update-without-classification.input';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

@InputType()
export class JobProfileReportsToUpsertWithWhereUniqueWithoutClassificationInput {
  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileReportsToUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileReportsToUpdateWithoutClassificationInput)
  update!: JobProfileReportsToUpdateWithoutClassificationInput;

  @Field(() => JobProfileReportsToCreateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateWithoutClassificationInput)
  create!: JobProfileReportsToCreateWithoutClassificationInput;
}
