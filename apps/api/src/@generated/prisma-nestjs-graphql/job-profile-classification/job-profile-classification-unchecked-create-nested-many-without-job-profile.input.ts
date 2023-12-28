import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationCreateWithoutJob_profileInput } from './job-profile-classification-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileClassificationCreateOrConnectWithoutJob_profileInput } from './job-profile-classification-create-or-connect-without-job-profile.input';
import { JobProfileClassificationCreateManyJob_profileInputEnvelope } from './job-profile-classification-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileClassificationWhereUniqueInput } from './job-profile-classification-where-unique.input';

@InputType()
export class JobProfileClassificationUncheckedCreateNestedManyWithoutJob_profileInput {
  @Field(() => [JobProfileClassificationCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateWithoutJob_profileInput)
  create?: Array<JobProfileClassificationCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileClassificationCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileClassificationCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileClassificationCreateOrConnectWithoutJob_profileInput>;

  @Field(() => JobProfileClassificationCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileClassificationCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileClassificationCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileClassificationWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileClassificationWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileClassificationWhereUniqueInput, 'classification_id_job_profile_id'>>;
}
