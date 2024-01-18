import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamCreateWithoutJob_familyInput } from './job-profile-stream-create-without-job-family.input';
import { Type } from 'class-transformer';
import { JobProfileStreamCreateOrConnectWithoutJob_familyInput } from './job-profile-stream-create-or-connect-without-job-family.input';
import { JobProfileStreamCreateManyJob_familyInputEnvelope } from './job-profile-stream-create-many-job-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileStreamWhereUniqueInput } from './job-profile-stream-where-unique.input';

@InputType()
export class JobProfileStreamCreateNestedManyWithoutJob_familyInput {
  @Field(() => [JobProfileStreamCreateWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamCreateWithoutJob_familyInput)
  create?: Array<JobProfileStreamCreateWithoutJob_familyInput>;

  @Field(() => [JobProfileStreamCreateOrConnectWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileStreamCreateOrConnectWithoutJob_familyInput)
  connectOrCreate?: Array<JobProfileStreamCreateOrConnectWithoutJob_familyInput>;

  @Field(() => JobProfileStreamCreateManyJob_familyInputEnvelope, { nullable: true })
  @Type(() => JobProfileStreamCreateManyJob_familyInputEnvelope)
  createMany?: JobProfileStreamCreateManyJob_familyInputEnvelope;

  @Field(() => [JobProfileStreamWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileStreamWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileStreamWhereUniqueInput, 'id'>>;
}
