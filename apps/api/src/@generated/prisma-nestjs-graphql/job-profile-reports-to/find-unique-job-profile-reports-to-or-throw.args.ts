import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class FindUniqueJobProfileReportsToOrThrowArgs {
  @Field(() => JobProfileReportsToWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>;
}
