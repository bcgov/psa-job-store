import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput } from './department-create-without-position-requests-by-paylist-department.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput } from './department-create-or-connect-without-position-requests-by-paylist-department.input';
import { DepartmentUpsertWithoutPositionRequestsByPaylistDepartmentInput } from './department-upsert-without-position-requests-by-paylist-department.input';
import { DepartmentWhereInput } from './department-where.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateToOneWithWhereWithoutPositionRequestsByPaylistDepartmentInput } from './department-update-to-one-with-where-without-position-requests-by-paylist-department.input';

@InputType()
export class DepartmentUpdateOneWithoutPositionRequestsByPaylistDepartmentNestedInput {
  @Field(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput)
  create?: DepartmentCreateWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentUpsertWithoutPositionRequestsByPaylistDepartmentInput, { nullable: true })
  @Type(() => DepartmentUpsertWithoutPositionRequestsByPaylistDepartmentInput)
  upsert?: DepartmentUpsertWithoutPositionRequestsByPaylistDepartmentInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  disconnect?: DepartmentWhereInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  @Type(() => DepartmentWhereInput)
  delete?: DepartmentWhereInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateToOneWithWhereWithoutPositionRequestsByPaylistDepartmentInput, { nullable: true })
  @Type(() => DepartmentUpdateToOneWithWhereWithoutPositionRequestsByPaylistDepartmentInput)
  update?: DepartmentUpdateToOneWithWhereWithoutPositionRequestsByPaylistDepartmentInput;
}
