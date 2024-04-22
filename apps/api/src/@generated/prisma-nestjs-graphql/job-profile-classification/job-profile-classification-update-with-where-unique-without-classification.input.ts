import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationUpdateWithoutClassificationInput } from './job-profile-classification-update-without-classification.input';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUpdateWithWhereUniqueWithoutClassificationInput {
  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileClassificationUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileClassificationUpdateWithoutClassificationInput)
  data!: JobProfileClassificationUpdateWithoutClassificationInput;
}
