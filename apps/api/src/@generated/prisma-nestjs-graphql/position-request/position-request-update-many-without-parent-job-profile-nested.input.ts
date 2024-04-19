import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateManyParent_job_profileInputEnvelope } from './position-request-create-many-parent-job-profile-input-envelope.input';
import { PositionRequestCreateOrConnectWithoutParent_job_profileInput } from './position-request-create-or-connect-without-parent-job-profile.input';
import { PositionRequestCreateWithoutParent_job_profileInput } from './position-request-create-without-parent-job-profile.input';
import { PositionRequestScalarWhereInput } from './position-request-scalar-where.input';
import { PositionRequestUpdateManyWithWhereWithoutParent_job_profileInput } from './position-request-update-many-with-where-without-parent-job-profile.input';
import { PositionRequestUpdateWithWhereUniqueWithoutParent_job_profileInput } from './position-request-update-with-where-unique-without-parent-job-profile.input';
import { PositionRequestUpsertWithWhereUniqueWithoutParent_job_profileInput } from './position-request-upsert-with-where-unique-without-parent-job-profile.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUpdateManyWithoutParent_job_profileNestedInput {
  @Field(() => [PositionRequestCreateWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutParent_job_profileInput)
  create?: Array<PositionRequestCreateWithoutParent_job_profileInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutParent_job_profileInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutParent_job_profileInput>;

  @Field(() => [PositionRequestUpsertWithWhereUniqueWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestUpsertWithWhereUniqueWithoutParent_job_profileInput)
  upsert?: Array<PositionRequestUpsertWithWhereUniqueWithoutParent_job_profileInput>;

  @Field(() => PositionRequestCreateManyParent_job_profileInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyParent_job_profileInputEnvelope)
  createMany?: PositionRequestCreateManyParent_job_profileInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  set?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;

  @Field(() => [PositionRequestUpdateWithWhereUniqueWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestUpdateWithWhereUniqueWithoutParent_job_profileInput)
  update?: Array<PositionRequestUpdateWithWhereUniqueWithoutParent_job_profileInput>;

  @Field(() => [PositionRequestUpdateManyWithWhereWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestUpdateManyWithWhereWithoutParent_job_profileInput)
  updateMany?: Array<PositionRequestUpdateManyWithWhereWithoutParent_job_profileInput>;

  @Field(() => [PositionRequestScalarWhereInput], { nullable: true })
  @Type(() => PositionRequestScalarWhereInput)
  deleteMany?: Array<PositionRequestScalarWhereInput>;
}
