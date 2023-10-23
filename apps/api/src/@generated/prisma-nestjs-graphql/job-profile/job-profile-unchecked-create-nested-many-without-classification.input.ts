import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutClassificationInput } from './job-profile-create-without-classification.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutClassificationInput } from './job-profile-create-or-connect-without-classification.input';
import { JobProfileCreateManyClassificationInputEnvelope } from './job-profile-create-many-classification-input-envelope.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileUncheckedCreateNestedManyWithoutClassificationInput {
  @Field(() => [JobProfileCreateWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileCreateWithoutClassificationInput)
  create?: Array<JobProfileCreateWithoutClassificationInput>;

  @Field(() => [JobProfileCreateOrConnectWithoutClassificationInput], { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutClassificationInput)
  connectOrCreate?: Array<JobProfileCreateOrConnectWithoutClassificationInput>;

  @Field(() => JobProfileCreateManyClassificationInputEnvelope, { nullable: true })
  @Type(() => JobProfileCreateManyClassificationInputEnvelope)
  createMany?: JobProfileCreateManyClassificationInputEnvelope;

  @Field(() => [JobProfileWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>>;
}
