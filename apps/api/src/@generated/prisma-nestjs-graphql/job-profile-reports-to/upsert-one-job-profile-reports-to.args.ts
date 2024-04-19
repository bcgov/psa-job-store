import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateInput } from './job-profile-reports-to-create.input';
import { JobProfileReportsToUpdateInput } from './job-profile-reports-to-update.input';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

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
