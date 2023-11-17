import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeUpdateInput } from './position-employee-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';

@ArgsType()
export class UpdateOnePositionEmployeeArgs {
  @Field(() => PositionEmployeeUpdateInput, { nullable: false })
  @Type(() => PositionEmployeeUpdateInput)
  data!: PositionEmployeeUpdateInput;

  @Field(() => PositionEmployeeWhereUniqueInput, { nullable: false })
  @Type(() => PositionEmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>;
}
