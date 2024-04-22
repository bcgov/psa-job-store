import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { PositionRequestCreateWithoutDepartmentInput } from './position-request-create-without-department.input';
import { PositionRequestUpdateWithoutDepartmentInput } from './position-request-update-without-department.input';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';

@InputType()
export class PositionRequestUpsertWithWhereUniqueWithoutDepartmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id' | 'crm_id'>;

  @Field(() => PositionRequestUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutDepartmentInput)
  update!: PositionRequestUpdateWithoutDepartmentInput;

  @Field(() => PositionRequestCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutDepartmentInput)
  create!: PositionRequestCreateWithoutDepartmentInput;
}
