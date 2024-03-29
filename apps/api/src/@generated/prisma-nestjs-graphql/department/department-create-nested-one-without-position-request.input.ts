import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutPositionRequestInput } from './department-create-without-position-request.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutPositionRequestInput } from './department-create-or-connect-without-position-request.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateNestedOneWithoutPositionRequestInput {
  @Field(() => DepartmentCreateWithoutPositionRequestInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutPositionRequestInput)
  create?: DepartmentCreateWithoutPositionRequestInput;

  @Field(() => DepartmentCreateOrConnectWithoutPositionRequestInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutPositionRequestInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutPositionRequestInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
