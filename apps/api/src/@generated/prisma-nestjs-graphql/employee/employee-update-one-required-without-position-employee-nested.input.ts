import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutPositionEmployeeInput } from './employee-create-without-position-employee.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutPositionEmployeeInput } from './employee-create-or-connect-without-position-employee.input';
import { EmployeeUpsertWithoutPositionEmployeeInput } from './employee-upsert-without-position-employee.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { EmployeeUpdateToOneWithWhereWithoutPositionEmployeeInput } from './employee-update-to-one-with-where-without-position-employee.input';

@InputType()
export class EmployeeUpdateOneRequiredWithoutPositionEmployeeNestedInput {
  @Field(() => EmployeeCreateWithoutPositionEmployeeInput, { nullable: true })
  @Type(() => EmployeeCreateWithoutPositionEmployeeInput)
  create?: EmployeeCreateWithoutPositionEmployeeInput;

  @Field(() => EmployeeCreateOrConnectWithoutPositionEmployeeInput, { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutPositionEmployeeInput)
  connectOrCreate?: EmployeeCreateOrConnectWithoutPositionEmployeeInput;

  @Field(() => EmployeeUpsertWithoutPositionEmployeeInput, { nullable: true })
  @Type(() => EmployeeUpsertWithoutPositionEmployeeInput)
  upsert?: EmployeeUpsertWithoutPositionEmployeeInput;

  @Field(() => EmployeeWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeUpdateToOneWithWhereWithoutPositionEmployeeInput, { nullable: true })
  @Type(() => EmployeeUpdateToOneWithWhereWithoutPositionEmployeeInput)
  update?: EmployeeUpdateToOneWithWhereWithoutPositionEmployeeInput;
}
