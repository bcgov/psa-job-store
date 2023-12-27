import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileClassificationUpdateInput } from './job-profile-classification-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationUpdateInput, { nullable: false })
  @Type(() => JobProfileClassificationUpdateInput)
  data!: JobProfileClassificationUpdateInput;

  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;
}
