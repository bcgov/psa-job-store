import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutParent_job_profileInput } from './position-request-update-without-parent-job-profile.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUpdateWithWhereUniqueWithoutParent_job_profileInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestUpdateWithoutParent_job_profileInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutParent_job_profileInput)
  data!: PositionRequestUpdateWithoutParent_job_profileInput;
}
