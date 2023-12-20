import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeUpdateWithoutPositionsInput } from './employee-update-without-positions.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutPositionsInput } from './employee-create-without-positions.input';
import { EmployeeWhereInput } from './employee-where.input';

@InputType()
export class EmployeeUpsertWithoutPositionsInput {
  @Field(() => EmployeeUpdateWithoutPositionsInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutPositionsInput)
  update!: EmployeeUpdateWithoutPositionsInput;

  @Field(() => EmployeeCreateWithoutPositionsInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutPositionsInput)
  create!: EmployeeCreateWithoutPositionsInput;

  @Field(() => EmployeeWhereInput, { nullable: true })
  @Type(() => EmployeeWhereInput)
  where?: EmployeeWhereInput;
}
