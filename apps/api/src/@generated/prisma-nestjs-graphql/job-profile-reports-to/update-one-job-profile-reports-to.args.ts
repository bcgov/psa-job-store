import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToUpdateInput } from './job-profile-reports-to-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToUpdateInput, { nullable: false })
  @Type(() => JobProfileReportsToUpdateInput)
  data!: JobProfileReportsToUpdateInput;

  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;
}
