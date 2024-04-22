import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateManyClassificationInputEnvelope } from './job-profile-classification-create-many-classification-input-envelope.input';
import { JobProfileClassificationCreateOrConnectWithoutClassificationInput } from './job-profile-classification-create-or-connect-without-classification.input';
import { JobProfileClassificationCreateWithoutClassificationInput } from './job-profile-classification-create-without-classification.input';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationCreateNestedManyWithoutClassificationInput {
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
