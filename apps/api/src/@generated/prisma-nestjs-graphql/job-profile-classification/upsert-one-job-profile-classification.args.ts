import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateInput } from './job-profile-classification-create.input';
import { JobProfileClassificationUpdateInput } from './job-profile-classification-update.input';

@ArgsType()
export class UpsertOneJobProfileClassificationArgs {
  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileClassificationCreateInput, { nullable: false })
  @Type(() => JobProfileClassificationCreateInput)
  create!: JobProfileClassificationCreateInput;

  @Field(() => JobProfileClassificationUpdateInput, { nullable: false })
  @Type(() => JobProfileClassificationUpdateInput)
  update!: JobProfileClassificationUpdateInput;
}
