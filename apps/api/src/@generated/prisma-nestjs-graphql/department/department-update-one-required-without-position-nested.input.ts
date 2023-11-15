import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionInput } from './department-create-without-position.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionInput } from './department-create-or-connect-without-position.input';
import { DepartmentUpsertWithoutPositionInput } from './department-upsert-without-position.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateToOneWithWhereWithoutPositionInput } from './department-update-to-one-with-where-without-position.input';

@InputType()
export class DepartmentUpdateOneRequiredWithoutPositionNestedInput {
  @Field(() => DepartmentCreateWithoutPositionInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionInput)
  create?: DepartmentCreateWithoutPositionInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionInput;

  @Field(() => DepartmentUpsertWithoutPositionInput, { nullable: true })
  @Type(() => DepartmentUpsertWithoutPositionInput)
  upsert?: DepartmentUpsertWithoutPositionInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateToOneWithWhereWithoutPositionInput, { nullable: true })
  @Type(() => DepartmentUpdateToOneWithWhereWithoutPositionInput)
  update?: DepartmentUpdateToOneWithWhereWithoutPositionInput;
}
