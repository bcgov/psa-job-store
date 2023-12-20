import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateWithoutClassificationInput } from './job-profile-reports-to-create-without-classification.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateOrConnectWithoutClassificationInput } from './job-profile-reports-to-create-or-connect-without-classification.input';
import { JobProfileReportsToCreateManyClassificationInputEnvelope } from './job-profile-reports-to-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

@InputType()
export class JobProfileReportsToUncheckedCreateNestedManyWithoutClassificationInput {
  @Field(() => [JobProfileReportsToCreateWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateWithoutClassificationInput)
  create?: Array<JobProfileReportsToCreateWithoutClassificationInput>;

  @Field(() => [JobProfileReportsToCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<JobProfileReportsToCreateOrConnectWithoutClassificationInput>;

  @Field(() => JobProfileReportsToCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => JobProfileReportsToCreateManyClassificationInputEnvelope)
  createMany?: JobProfileReportsToCreateManyClassificationInputEnvelope;

  @Field(() => [JobProfileReportsToWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>>;
}
