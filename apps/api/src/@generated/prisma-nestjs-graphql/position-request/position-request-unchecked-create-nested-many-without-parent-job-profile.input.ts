import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionRequestCreateWithoutParent_job_profileInput } from './position-request-create-without-parent-job-profile.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateOrConnectWithoutParent_job_profileInput } from './position-request-create-or-connect-without-parent-job-profile.input';
import { PositionRequestCreateManyParent_job_profileInputEnvelope } from './position-request-create-many-parent-job-profile-input-envelope.input';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUncheckedCreateNestedManyWithoutParent_job_profileInput {
  @Field(() => [PositionRequestCreateWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestCreateWithoutParent_job_profileInput)
  create?: Array<PositionRequestCreateWithoutParent_job_profileInput>;

  @Field(() => [PositionRequestCreateOrConnectWithoutParent_job_profileInput], { nullable: true })
  @Type(() => PositionRequestCreateOrConnectWithoutParent_job_profileInput)
  connectOrCreate?: Array<PositionRequestCreateOrConnectWithoutParent_job_profileInput>;

  @Field(() => PositionRequestCreateManyParent_job_profileInputEnvelope, { nullable: true })
  @Type(() => PositionRequestCreateManyParent_job_profileInputEnvelope)
  createMany?: PositionRequestCreateManyParent_job_profileInputEnvelope;

  @Field(() => [PositionRequestWhereUniqueInput], { nullable: true })
  @Type(() => PositionRequestWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>>;
}
