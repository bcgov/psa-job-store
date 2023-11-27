import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutDepartmentInput } from './employee-create-without-department.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutDepartmentInput } from './employee-create-or-connect-without-department.input';
import { EmployeeUpsertWithWhereUniqueWithoutDepartmentInput } from './employee-upsert-with-where-unique-without-department.input';
import { EmployeeCreateManyDepartmentInputEnvelope } from './employee-create-many-department-input-envelope.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { EmployeeUpdateWithWhereUniqueWithoutDepartmentInput } from './employee-update-with-where-unique-without-department.input';
import { EmployeeUpdateManyWithWhereWithoutDepartmentInput } from './employee-update-many-with-where-without-department.input';
import { EmployeeScalarWhereInput } from './employee-scalar-where.input';

@InputType()
export class EmployeeUncheckedUpdateManyWithoutDepartmentNestedInput {
  @Field(() => [EmployeeCreateWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeCreateWithoutDepartmentInput)
  create?: Array<EmployeeCreateWithoutDepartmentInput>;

  @Field(() => [EmployeeCreateOrConnectWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutDepartmentInput)
  connectOrCreate?: Array<EmployeeCreateOrConnectWithoutDepartmentInput>;

  @Field(() => [EmployeeUpsertWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeUpsertWithWhereUniqueWithoutDepartmentInput)
  upsert?: Array<EmployeeUpsertWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => EmployeeCreateManyDepartmentInputEnvelope, { nullable: true })
  @Type(() => EmployeeCreateManyDepartmentInputEnvelope)
  createMany?: EmployeeCreateManyDepartmentInputEnvelope;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  set?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  disconnect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  delete?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeWhereUniqueInput], { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Array<Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>>;

  @Field(() => [EmployeeUpdateWithWhereUniqueWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeUpdateWithWhereUniqueWithoutDepartmentInput)
  update?: Array<EmployeeUpdateWithWhereUniqueWithoutDepartmentInput>;

  @Field(() => [EmployeeUpdateManyWithWhereWithoutDepartmentInput], { nullable: true })
  @Type(() => EmployeeUpdateManyWithWhereWithoutDepartmentInput)
  updateMany?: Array<EmployeeUpdateManyWithWhereWithoutDepartmentInput>;

  @Field(() => [EmployeeScalarWhereInput], { nullable: true })
  @Type(() => EmployeeScalarWhereInput)
  deleteMany?: Array<EmployeeScalarWhereInput>;
}
