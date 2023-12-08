import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutParent_job_profileInput } from './position-request-update-without-parent-job-profile.input';
import { PositionRequestCreateWithoutParent_job_profileInput } from './position-request-create-without-parent-job-profile.input';

@InputType()
export class PositionRequestUpsertWithWhereUniqueWithoutParent_job_profileInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>;

  @Field(() => PositionRequestUpdateWithoutParent_job_profileInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutParent_job_profileInput)
  update!: PositionRequestUpdateWithoutParent_job_profileInput;

  @Field(() => PositionRequestCreateWithoutParent_job_profileInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutParent_job_profileInput)
  create!: PositionRequestCreateWithoutParent_job_profileInput;
}
