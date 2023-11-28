import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { Type } from 'class-transformer';
import { PositionEmployeeUpdateWithoutPositionInput } from './position-employee-update-without-position.input';

@InputType()
export class PositionEmployeeUpdateWithWhereUniqueWithoutPositionInput {
  @Field(() => PositionEmployeeWhereUniqueInput, { nullable: false })
  @Type(() => PositionEmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>;

  @Field(() => PositionEmployeeUpdateWithoutPositionInput, { nullable: false })
  @Type(() => PositionEmployeeUpdateWithoutPositionInput)
  data!: PositionEmployeeUpdateWithoutPositionInput;
}
