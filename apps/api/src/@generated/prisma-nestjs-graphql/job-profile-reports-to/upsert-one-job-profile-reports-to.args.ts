import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateInput } from './job-profile-reports-to-create.input';
import { JobProfileReportsToUpdateInput } from './job-profile-reports-to-update.input';

@ArgsType()
export class UpsertOneJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileReportsToCreateInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateInput)
  create!: JobProfileReportsToCreateInput;

  @Field(() => JobProfileReportsToUpdateInput, { nullable: false })
  @Type(() => JobProfileReportsToUpdateInput)
  update!: JobProfileReportsToUpdateInput;
}
