import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeWhereInput } from './employee-where.input';
import { Type } from 'class-transformer';
import { EmployeeUpdateWithoutPositionsInput } from './employee-update-without-positions.input';

@InputType()
export class EmployeeUpdateToOneWithWhereWithoutPositionsInput {
  @Field(() => EmployeeWhereInput, { nullable: true })
  @Type(() => EmployeeWhereInput)
  where?: EmployeeWhereInput;

  @Field(() => EmployeeUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutPositionsInput)
  data!: EmployeeUpdateWithoutPositionsInput;
}
