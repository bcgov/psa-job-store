import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionCreateWithoutEmployeesInput } from './position-create-without-employees.input';
import { Type } from 'class-transformer';
import { PositionCreateOrConnectWithoutEmployeesInput } from './position-create-or-connect-without-employees.input';
import { Prisma } from '@prisma/client';
import { PositionWhereUniqueInput } from './position-where-unique.input';

@InputType()
export class PositionCreateNestedOneWithoutEmployeesInput {
  @Field(() => PositionCreateWithoutEmployeesInput, { nullable: true })
  @Type(() => PositionCreateWithoutEmployeesInput)
  create?: PositionCreateWithoutEmployeesInput;

  @Field(() => PositionCreateOrConnectWithoutEmployeesInput, { nullable: true })
  @Type(() => PositionCreateOrConnectWithoutEmployeesInput)
  connectOrCreate?: PositionCreateOrConnectWithoutEmployeesInput;

  @Field(() => PositionWhereUniqueInput, { nullable: true })
  @Type(() => PositionWhereUniqueInput)
  connect?: Prisma.AtLeast<PositionWhereUniqueInput, 'id'>;
}
