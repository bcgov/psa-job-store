import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeUpdateWithoutDepartmentInput } from './employee-update-without-department.input';
import { EmployeeCreateWithoutDepartmentInput } from './employee-create-without-department.input';

@InputType()
export class EmployeeUpsertWithWhereUniqueWithoutDepartmentInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutDepartmentInput)
  update!: EmployeeUpdateWithoutDepartmentInput;

  @Field(() => EmployeeCreateWithoutDepartmentInput, { nullable: false })
  @Type(() => EmployeeCreateWithoutDepartmentInput)
  create!: EmployeeCreateWithoutDepartmentInput;
}
