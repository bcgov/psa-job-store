import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutParentInput } from './job-profile-create-without-parent.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutParentInput } from './job-profile-create-or-connect-without-parent.input';
import { JobProfileCreateManyParentInputEnvelope } from './job-profile-create-many-parent-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutParentInput {
  @Field(() => [JobProfileCreateWithoutParentInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutParentInput)
  create?: Array<JobProfileCreateWithoutParentInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutParentInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutParentInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutParentInput>;

  @Field(() => JobProfileCreateManyParentInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyParentInputEnvelope)
  createMany?: JobProfileCreateManyParentInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
