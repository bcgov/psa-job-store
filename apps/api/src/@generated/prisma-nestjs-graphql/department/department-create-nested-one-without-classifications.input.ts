import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutClassificationsInput } from './department-create-without-classifications.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutClassificationsInput } from './department-create-or-connect-without-classifications.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';

@InputType()
export class DepartmentCreateNestedOneWithoutClassificationsInput {
  @Field(() => DepartmentCreateWithoutClassificationsInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutClassificationsInput)
  create?: DepartmentCreateWithoutClassificationsInput;

  @Field(() => DepartmentCreateOrConnectWithoutClassificationsInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutClassificationsInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutClassificationsInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;
}
