import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutPositionEmployeeInput } from './employee-create-without-position-employee.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutPositionEmployeeInput } from './employee-create-or-connect-without-position-employee.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';

@InputType()
export class EmployeeCreateNestedOneWithoutPositionEmployeeInput {
  @Field(() => EmployeeCreateWithoutPositionEmployeeInput, { nullable: true })
  @Type(() => EmployeeCreateWithoutPositionEmployeeInput)
  create?: EmployeeCreateWithoutPositionEmployeeInput;

  @Field(() => EmployeeCreateOrConnectWithoutPositionEmployeeInput, { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutPositionEmployeeInput)
  connectOrCreate?: EmployeeCreateOrConnectWithoutPositionEmployeeInput;

  @Field(() => EmployeeWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;
}
