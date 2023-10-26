import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToCreateWithoutJob_profileInput } from './job-profile-reports-to-create-without-job-profile.input';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateOrConnectWithoutJob_profileInput } from './job-profile-reports-to-create-or-connect-without-job-profile.input';
import { JobProfileReportsToCreateManyJob_profileInputEnvelope } from './job-profile-reports-to-create-many-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileReportsToWhereUniqueInput } from './job-profile-reports-to-where-unique.input';

@InputType()
export class JobProfileReportsToUncheckedCreateNestedManyWithoutJob_profileInput {
  @Field(() => [JobProfileReportsToCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateWithoutJob_profileInput)
  create?: Array<JobProfileReportsToCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileReportsToCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileReportsToCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileReportsToCreateOrConnectWithoutJob_profileInput>;

  @Field(() => JobProfileReportsToCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileReportsToCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileReportsToCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileReportsToWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileReportsToWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileReportsToWhereUniqueInput, 'classification_id_job_profile_id'>>;
}
