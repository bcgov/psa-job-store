import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { PositionEmployeeWhereUniqueInput } from './position-employee-where-unique.input';
import { Type } from 'class-transformer';
import { PositionEmployeeCreateInput } from './position-employee-create.input';
import { PositionEmployeeUpdateInput } from './position-employee-update.input';

@ArgsType()
export class UpsertOnePositionEmployeeArgs {
  @Field(() => PositionEmployeeWhereUniqueInput, { nullable: false })
  @Type(() => PositionEmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<PositionEmployeeWhereUniqueInput, 'employee_id_position_id'>;

  @Field(() => PositionEmployeeCreateInput, { nullable: false })
  @Type(() => PositionEmployeeCreateInput)
  create!: PositionEmployeeCreateInput;

  @Field(() => PositionEmployeeUpdateInput, { nullable: false })
  @Type(() => PositionEmployeeUpdateInput)
  update!: PositionEmployeeUpdateInput;
}
