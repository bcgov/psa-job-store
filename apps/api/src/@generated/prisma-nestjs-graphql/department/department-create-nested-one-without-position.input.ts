import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionInput } from './department-create-without-position.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionInput } from './department-create-or-connect-without-position.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateNestedOneWithoutPositionInput {
  @Field(() => DepartmentCreateWithoutPositionInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionInput)
  create?: DepartmentCreateWithoutPositionInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
