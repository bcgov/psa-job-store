import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutDepartmentInput } from './employee-create-without-department.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutDepartmentInput } from './employee-create-or-connect-without-department.input';
import { EmployeeCreateManyDepartmentInputEnvelope } from './employee-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';

@InputType()
export class EmployeeCreateNestedManyWithoutDepartmentInput {
  @Field(() => [EmployeeCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeCreateWithoutDepartmentInput)
  create?: Array<EmployeeCreateWithoutDepartmentInput>;

  @Field(() => [EmployeeCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<EmployeeCreateOrConnectWithoutDepartmentInput>;

  @Field(() => EmployeeCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => EmployeeCreateManyDepartmentInputEnvelope)
  createMany?: EmployeeCreateManyDepartmentInputEnvelope;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;
}
