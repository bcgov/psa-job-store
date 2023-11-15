import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { Type } from 'class-transformer';
import { PositionEmployeeUpdateWithoutPositionInput } from './position-employee-update-without-position.input';
import { PositionEmployeeCreateWithoutPositionInput } from './position-employee-create-without-position.input';

@InputType()
export class PositionEmployeeUpsertWithWhereUniqueWithoutPositionInput {
  @Field(() => PositionEmployeeWhereUniqueInput, { nullable: false })
  @Type(() => PositionEmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>;

  @Field(() => PositionEmployeeUpdateWithoutPositionInput, { nullable: false })
  @Type(() => PositionEmployeeUpdateWithoutPositionInput)
  update!: PositionEmployeeUpdateWithoutPositionInput;

  @Field(() => PositionEmployeeCreateWithoutPositionInput, { nullable: false })
  @Type(() => PositionEmployeeCreateWithoutPositionInput)
  create!: PositionEmployeeCreateWithoutPositionInput;
}
