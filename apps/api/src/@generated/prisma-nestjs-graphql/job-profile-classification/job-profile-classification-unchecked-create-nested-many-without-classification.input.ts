import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationCreateWithoutClassificationInput } from './job-profile-classification-create-without-classification.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateOrConnectWithoutClassificationInput } from './job-profile-classification-create-or-connect-without-classification.input';
import { JobProfileClassificationCreateManyClassificationInputEnvelope } from './job-profile-classification-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUncheckedCreateNestedManyWithoutClassificationInput {
  @Field(() => [JobProfileClassificationCreateWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateWithoutClassificationInput)
  create?: Array<JobProfileClassificationCreateWithoutClassificationInput>;

  @Field(() => [JobProfileClassificationCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<JobProfileClassificationCreateOrConnectWithoutClassificationInput>;

  @Field(() => JobProfileClassificationCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => JobProfileClassificationCreateManyClassificationInputEnvelope)
  createMany?: JobProfileClassificationCreateManyClassificationInputEnvelope;

  @Field(() => [JobProfileClassificationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>>;
}
