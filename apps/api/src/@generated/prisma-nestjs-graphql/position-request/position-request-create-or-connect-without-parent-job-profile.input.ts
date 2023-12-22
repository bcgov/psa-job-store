import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutParent_job_profileInput } from './position-request-create-without-parent-job-profile.input';

@InputType()
export class PositionRequestCreateOrConnectWithoutParent_job_profileInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>;

  @Field(() => PositionRequestCreateWithoutParent_job_profileInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutParent_job_profileInput)
  create!: PositionRequestCreateWithoutParent_job_profileInput;
}
