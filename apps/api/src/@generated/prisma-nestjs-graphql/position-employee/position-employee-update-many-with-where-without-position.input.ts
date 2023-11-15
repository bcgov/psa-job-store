import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeScalarWhereInput } from './position-employee-scalar-where.input';
import { Type } from 'class-transformer';
import { PositionEmployeeUncheckedUpdateManyWithoutPositionInput } from './position-employee-unchecked-update-many-without-position.input';

@InputType()
export class PositionEmployeeUpdateManyWithWhereWithoutPositionInput {
  @Field(() => PositionEmployeeScalarWhereInput, { nullable: false })
  @Type(() => PositionEmployeeScalarWhereInput)
  where!: PositionEmployeeScalarWhereInput;

  @Field(() => PositionEmployeeUncheckedUpdateManyWithoutPositionInput, { nullable: false })
  @Type(() => PositionEmployeeUncheckedUpdateManyWithoutPositionInput)
  data!: PositionEmployeeUncheckedUpdateManyWithoutPositionInput;
}
