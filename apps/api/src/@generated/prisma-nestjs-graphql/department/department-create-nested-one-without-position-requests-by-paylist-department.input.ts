import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput } from './department-create-without-position-requests-by-paylist-department.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput } from './department-create-or-connect-without-position-requests-by-paylist-department.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateNestedOneWithoutPositionRequestsByPaylistDepartmentInput {
  @Field(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput)
  create?: DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
