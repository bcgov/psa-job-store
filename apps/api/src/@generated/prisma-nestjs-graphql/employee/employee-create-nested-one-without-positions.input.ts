import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutPositionsInput } from './employee-create-without-positions.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutPositionsInput } from './employee-create-or-connect-without-positions.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';

@InputType()
export class EmployeeCreateNestedOneWithoutPositionsInput {
  @Field(() => EmployeeCreateWithoutPositionsInput, { nullable: true })
  @Type(() => EmployeeCreateWithoutPositionsInput)
  create?: EmployeeCreateWithoutPositionsInput;

  @Field(() => EmployeeCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: EmployeeCreateOrConnectWithoutPositionsInput;

  @Field(() => EmployeeWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;
}
