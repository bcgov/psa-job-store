import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutPositionEmployeeInput } from './employee-create-without-position-employee.input';

@InputType()
export class EmployeeCreateOrConnectWithoutPositionEmployeeInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeCreateWithoutPositionEmployeeInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutPositionEmployeeInput)
  create!: EmployeeCreateWithoutPositionEmployeeInput;
}
