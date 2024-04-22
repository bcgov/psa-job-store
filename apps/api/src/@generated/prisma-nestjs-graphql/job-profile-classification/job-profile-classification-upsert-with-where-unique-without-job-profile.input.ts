import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateWithoutJob_profileInput } from './job-profile-classification-create-without-job-profile.input';
import { JobProfileClassificationUpdateWithoutJob_profileInput } from './job-profile-classification-update-without-job-profile.input';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUpsertWithWhereUniqueWithoutJob_profileInput {
  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileClassificationUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileClassificationUpdateWithoutJob_profileInput)
  update!: JobProfileClassificationUpdateWithoutJob_profileInput;

  @Field(() => JobProfileClassificationCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileClassificationCreateWithoutJob_profileInput)
  create!: JobProfileClassificationCreateWithoutJob_profileInput;
}
