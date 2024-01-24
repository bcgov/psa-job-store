import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionRequestWhereUniqueInput } from './position-request-where-unique.input';
import { Type } from 'class-transformer';
import { PositionRequestUpdateWithoutDepartmentInput } from './position-request-update-without-department.input';
import { PositionRequestCreateWithoutDepartmentInput } from './position-request-create-without-department.input';

@InputType()
export class PositionRequestUpsertWithWhereUniqueWithoutDepartmentInput {
  @Field(() => PositionRequestWhereUniqueInput, { nullable: false })
  @Type(() => PositionRequestWhereUniqueInput)
  where!: Prisma.AtLeast<PositionRequestWhereUniqueInput, 'id'>;

  @Field(() => PositionRequestUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionRequestUpdateWithoutDepartmentInput)
  update!: PositionRequestUpdateWithoutDepartmentInput;

  @Field(() => PositionRequestCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => PositionRequestCreateWithoutDepartmentInput)
  create!: PositionRequestCreateWithoutDepartmentInput;
}
