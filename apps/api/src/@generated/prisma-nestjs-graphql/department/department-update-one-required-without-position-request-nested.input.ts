import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionRequestInput } from './department-create-without-position-request.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionRequestInput } from './department-create-or-connect-without-position-request.input';
import { DepartmentUpsertWithoutPositionRequestInput } from './department-upsert-without-position-request.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateToOneWithWhereWithoutPositionRequestInput } from './department-update-to-one-with-where-without-position-request.input';

@InputType()
export class DepartmentUpdateOneRequiredWithoutPositionRequestNestedInput {
  @Field(() => DepartmentCreateWithoutPositionRequestInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionRequestInput)
  create?: DepartmentCreateWithoutPositionRequestInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionRequestInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionRequestInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionRequestInput;

  @Field(() => DepartmentUpsertWithoutPositionRequestInput, { nullable: true })
  @Type(() => DepartmentUpsertWithoutPositionRequestInput)
  upsert?: DepartmentUpsertWithoutPositionRequestInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateToOneWithWhereWithoutPositionRequestInput, { nullable: true })
  @Type(() => DepartmentUpdateToOneWithWhereWithoutPositionRequestInput)
  update?: DepartmentUpdateToOneWithWhereWithoutPositionRequestInput;
}
