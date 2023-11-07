import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutCareer_groupInput } from './job-profile-create-without-career-group.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutCareer_groupInput } from './job-profile-create-or-connect-without-career-group.input';
import { JobProfileCreateManyCareer_groupInputEnvelope } from './job-profile-create-many-career-group-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedManyWithoutCareer_groupInput {
  @Field(() => [JobProfileCreateWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutCareer_groupInput)
  create?: Array<JobProfileCreateWithoutCareer_groupInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutCareer_groupInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutCareer_groupInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutCareer_groupInput>;

  @Field(() => JobProfileCreateManyCareer_groupInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyCareer_groupInputEnvelope)
  createMany?: JobProfileCreateManyCareer_groupInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
