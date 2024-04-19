import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationUpdateInput } from './job-profile-classification-update.input';
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
