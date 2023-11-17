import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { Type } from 'class-transformer';
import { EmployeeUpdateWithoutDepartmentInput } from './employee-update-without-department.input';

@InputType()
export class EmployeeUpdateWithWhereUniqueWithoutDepartmentInput {
  @Field(() => EmployeeWhereUniqueInput, { nullable: false })
  @Type(() => EmployeeWhereUniqueInput)
  where!: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeUpdateWithoutDepartmentInput, { nullable: false })
  @Type(() => EmployeeUpdateWithoutDepartmentInput)
  data!: EmployeeUpdateWithoutDepartmentInput;
}
