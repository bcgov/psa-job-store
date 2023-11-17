import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionsInput } from './department-create-without-positions.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionsInput } from './department-create-or-connect-without-positions.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateNestedOneWithoutPositionsInput {
  @Field(() => DepartmentCreateWithoutPositionsInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionsInput)
  create?: DepartmentCreateWithoutPositionsInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionsInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionsInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionsInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
