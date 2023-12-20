import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeScalarWhereInput } from './position-employee-scalar-where.input';
import { Type } from 'class-transformer';
import { PositionEmployeeUncheckedUpdateManyWithoutEmployeeInput } from './position-employee-unchecked-update-many-without-employee.input';

@InputType()
export class PositionEmployeeUpdateManyWithWhereWithoutEmployeeInput {
  @Field(() => PositionEmployeeScalarWhereInput, { nullable: false })
  @Type(() => PositionEmployeeScalarWhereInput)
  where!: PositionEmployeeScalarWhereInput;

  @Field(() => PositionEmployeeUncheckedUpdateManyWithoutEmployeeInput, { nullable: false })
  @Type(() => PositionEmployeeUncheckedUpdateManyWithoutEmployeeInput)
  data!: PositionEmployeeUncheckedUpdateManyWithoutEmployeeInput;
}
