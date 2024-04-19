import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateWithoutClassificationInput } from './job-profile-classification-create-without-classification.input';
import { JobProfileClassificationUpdateWithoutClassificationInput } from './job-profile-classification-update-without-classification.input';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUpsertWithWhereUniqueWithoutClassificationInput {
  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileClassificationUpdateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileClassificationUpdateWithoutClassificationInput)
  update!: JobProfileClassificationUpdateWithoutClassificationInput;

  @Field(() => JobProfileClassificationCreateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileClassificationCreateWithoutClassificationInput)
  create!: JobProfileClassificationCreateWithoutClassificationInput;
}
