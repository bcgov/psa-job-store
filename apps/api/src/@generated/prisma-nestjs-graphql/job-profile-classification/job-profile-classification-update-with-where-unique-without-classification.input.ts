import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationUpdateWithoutClassificationInput } from './job-profile-classification-update-without-classification.input';

@InputType()
export class JobProfileClassificationUpdateWithWhereUniqueWithoutClassificationInput {
  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileClassificationUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileClassificationUpdateWithoutClassificationInput)
  data!: JobProfileClassificationUpdateWithoutClassificationInput;
}
