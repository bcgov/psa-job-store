import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateWithoutClassificationInput } from './job-profile-classification-create-without-classification.input';

@InputType()
export class JobProfileClassificationCreateOrConnectWithoutClassificationInput {
  @Field(() => JobProfileClassificationWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>;

  @Field(() => JobProfileClassificationCreateWithoutClassificationInput, { nullable: false })
  @Type(() => JobProfileClassificationCreateWithoutClassificationInput)
  create!: JobProfileClassificationCreateWithoutClassificationInput;
}
