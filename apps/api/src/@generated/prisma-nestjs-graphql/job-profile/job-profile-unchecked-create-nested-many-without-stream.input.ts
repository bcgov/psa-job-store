import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutStreamInput } from './job-profile-create-without-stream.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutStreamInput } from './job-profile-create-or-connect-without-stream.input';
import { JobProfileCreateManyStreamInputEnvelope } from './job-profile-create-many-stream-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutStreamInput {
  @Field(() => [JobProfileCreateWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutStreamInput)
  create?: Array<JobProfileCreateWithoutStreamInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutStreamInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutStreamInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutStreamInput>;

  @Field(() => JobProfileCreateManyStreamInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyStreamInputEnvelope)
  createMany?: JobProfileCreateManyStreamInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
