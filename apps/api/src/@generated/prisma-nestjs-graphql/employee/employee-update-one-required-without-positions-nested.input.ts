import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeCreateWithoutPositionsInput } from './employee-create-without-positions.input';
import { Type } from 'class-transformer';
import { EmployeeCreateOrConnectWithoutPositionsInput } from './employee-create-or-connect-without-positions.input';
import { EmployeeUpsertWithoutPositionsInput } from './employee-upsert-without-positions.input';
import { Prisma } from '@prisma/client';
import { EmployeeWhereUniqueInput } from './employee-where-unique.input';
import { EmployeeUpdateToOneWithWhereWithoutPositionsInput } from './employee-update-to-one-with-where-without-positions.input';

@InputType()
export class EmployeeUpdateOneRequiredWithoutPositionsNestedInput {
  @Field(() => EmployeeCreateWithoutPositionsInput, { nullable: true })
  @Type(() => EmployeeCreateWithoutPositionsInput)
  create?: EmployeeCreateWithoutPositionsInput;

  @Field(() => EmployeeCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => EmployeeCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: EmployeeCreateOrConnectWithoutPositionsInput;

  @Field(() => EmployeeUpsertWithoutPositionsInput, { nullable: true })
  @Type(() => EmployeeUpsertWithoutPositionsInput)
  upsert?: EmployeeUpsertWithoutPositionsInput;

  @Field(() => EmployeeWhereUniqueInput, { nullable: true })
  @Type(() => EmployeeWhereUniqueInput)
  connect?: Prisma.AtLeast<EmployeeWhereUniqueInput, 'id'>;

  @Field(() => EmployeeUpdateToOneWithWhereWithoutPositionsInput, { nullable: true })
  @Type(() => EmployeeUpdateToOneWithWhereWithoutPositionsInput)
  update?: EmployeeUpdateToOneWithWhereWithoutPositionsInput;
}
