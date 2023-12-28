import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutJob_familyInput } from './job-profile-create-without-job-family.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutJob_familyInput } from './job-profile-create-or-connect-without-job-family.input';
import { JobProfileCreateManyJob_familyInputEnvelope } from './job-profile-create-many-job-family-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutJob_familyInput {
  @Field(() => [JobProfileCreateWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutJob_familyInput)
  create?: Array<JobProfileCreateWithoutJob_familyInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutJob_familyInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutJob_familyInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutJob_familyInput>;

  @Field(() => JobProfileCreateManyJob_familyInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyJob_familyInputEnvelope)
  createMany?: JobProfileCreateManyJob_familyInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
