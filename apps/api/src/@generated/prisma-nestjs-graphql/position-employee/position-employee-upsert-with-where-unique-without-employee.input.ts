import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { Type } from 'class-transformer';
import { PositionEmployeeUpdateWithoutEmployeeInput } from './position-employee-update-without-employee.input';
import { PositionEmployeeCreateWithoutEmployeeInput } from './position-employee-create-without-employee.input';

@InputType()
export class PositionEmployeeUpsertWithWhereUniqueWithoutEmployeeInput {
  @Field(() => PositionEmployeeWhereUniqueInput, { nullable: false })
  @Type(() => PositionEmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>;

  @Field(() => PositionEmployeeUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => PositionEmployeeUpdateWithoutEmployeeInput)
  update!: PositionEmployeeUpdateWithoutEmployeeInput;

  @Field(() => PositionEmployeeCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => PositionEmployeeCreateWithoutEmployeeInput)
  create!: PositionEmployeeCreateWithoutEmployeeInput;
}
