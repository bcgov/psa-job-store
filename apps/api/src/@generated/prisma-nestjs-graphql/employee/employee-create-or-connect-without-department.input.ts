import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeCreateWithoutDepartmentInput } from './employee-create-without-department.input';

@InputType()
export class EmployeeCreateOrConnectWithoutDepartmentInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutDepartmentInput)
  create!: EmployeeCreateWithoutDepartmentInput;
}
