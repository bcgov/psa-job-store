import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateManyJob_profileInputEnvelope } from './job-profile-reports-to-create-many-job-profile-input-envelope.input';
import { JobProfileReportsToCreateOrConnectWithoutJob_profileInput } from './job-profile-reports-to-create-or-connect-without-job-profile.input';
import { JobProfileReportsToCreateWithoutJob_profileInput } from './job-profile-reports-to-create-without-job-profile.input';
import { JobProfileReportsToScalarWhereInput } from './job-profile-reports-to-scalar-where.input';
import { JobProfileReportsToUpdateManyWithWhereWithoutJob_profileInput } from './job-profile-reports-to-update-many-with-where-without-job-profile.input';
import { JobProfileReportsToUpdateWithWhereUniqueWithoutJob_profileInput } from './job-profile-reports-to-update-with-where-unique-without-job-profile.input';
import { JobProfileReportsToUpsertWithWhereUniqueWithoutJob_profileInput } from './job-profile-reports-to-upsert-with-where-unique-without-job-profile.input';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

@InputType()
export class JobProfileReportsToUpdateManyWithoutJob_profileNestedInput {
  @Field(() => [JobProfileReportsToCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateWithoutJob_profileInput)
  create?: Array<JobProfileReportsToCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileReportsToCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileReportsToCreateOrConnectWithoutJob_profileInput>;

  @Field(() => [JobProfileReportsToUpsertWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToUpsertWithWhereUniqueWithoutJob_profileInput)
  upsert?: Array<JobProfileReportsToUpsertWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => JobProfileReportsToCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileReportsToCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileReportsToCreateManyJob_profileInputEnvelope;

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

  @Field(() => [JobProfileReportsToUpdateWithWhereUniqueWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToUpdateWithWhereUniqueWithoutJob_profileInput)
  update?: Array<JobProfileReportsToUpdateWithWhereUniqueWithoutJob_profileInput>;

  @Field(() => [JobProfileReportsToUpdateManyWithWhereWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToUpdateManyWithWhereWithoutJob_profileInput)
  updateMany?: Array<JobProfileReportsToUpdateManyWithWhereWithoutJob_profileInput>;

  @Field(() => [JobProfileReportsToScalarWhereInput], { nullable: true })
  @Type(() => JobProfileReportsToScalarWhereInput)
  deleteMany?: Array<JobProfileReportsToScalarWhereInput>;
}
