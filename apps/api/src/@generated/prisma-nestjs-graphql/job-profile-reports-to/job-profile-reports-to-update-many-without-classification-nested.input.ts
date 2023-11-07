import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateWithoutClassificationInput } from './job-profile-reports-to-create-without-classification.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateOrConnectWithoutClassificationInput } from './job-profile-reports-to-create-or-connect-without-classification.input';
import { JobProfileReportsToUpsertWithWhereUniqueWithoutClassificationInput } from './job-profile-reports-to-upsert-with-where-unique-without-classification.input';
import { JobProfileReportsToCreateManyClassificationInputEnvelope } from './job-profile-reports-to-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';
import { JobProfileReportsToUpdateWithWhereUniqueWithoutClassificationInput } from './job-profile-reports-to-update-with-where-unique-without-classification.input';
import { JobProfileReportsToUpdateManyWithWhereWithoutClassificationInput } from './job-profile-reports-to-update-many-with-where-without-classification.input';
import { JobProfileReportsToScalarWhereInput } from './job-profile-reports-to-scalar-where.input';

@InputType()
export class JobProfileReportsToUpdateManyWithoutClassificationNestedInput {
  @Field(() => [JobProfileReportsToCreateWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateWithoutClassificationInput)
  create?: Array<JobProfileReportsToCreateWithoutClassificationInput>;

  @Field(() => [JobProfileReportsToCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<JobProfileReportsToCreateOrConnectWithoutClassificationInput>;

  @Field(() => [JobProfileReportsToUpsertWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToUpsertWithWhereUniqueWithoutClassificationInput)
  upsert?: Array<JobProfileReportsToUpsertWithWhereUniqueWithoutClassificationInput>;

  @Field(() => JobProfileReportsToCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => JobProfileReportsToCreateManyClassificationInputEnvelope)
  createMany?: JobProfileReportsToCreateManyClassificationInputEnvelope;

  @Field(() => [JobProfileReportsToWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  set?: Array<Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileReportsToWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileReportsToWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileReportsToWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>>;

  @Field(() => [JobProfileReportsToUpdateWithWhereUniqueWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToUpdateWithWhereUniqueWithoutClassificationInput)
  update?: Array<JobProfileReportsToUpdateWithWhereUniqueWithoutClassificationInput>;

  @Field(() => [JobProfileReportsToUpdateManyWithWhereWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileReportsToUpdateManyWithWhereWithoutClassificationInput)
  updateMany?: Array<JobProfileReportsToUpdateManyWithWhereWithoutClassificationInput>;

  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  @Type(() => JobProfileReportsToScalarWhereInput)
  deleteMany?: Array<JobProfileReportsToScalarWhereInput>;
}
