import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentCreateWithoutClassificationsInput } from './department-create-without-classifications.input';
import { Type } from 'class-transformer';
import { DepartmentCreateOrConnectWithoutClassificationsInput } from './department-create-or-connect-without-classifications.input';
import { DepartmentUpsertWithoutClassificationsInput } from './department-upsert-without-classifications.input';
import { Prisma } from '@prisma/client';
import { DepartmentWhereUniqueInput } from './department-where-unique.input';
import { DepartmentUpdateToOneWithWhereWithoutClassificationsInput } from './department-update-to-one-with-where-without-classifications.input';

@InputType()
export class DepartmentUpdateOneRequiredWithoutClassificationsNestedInput {
  @Field(() => DepartmentCreateWithoutClassificationsInput, { nullable: true })
  @Type(() => DepartmentCreateWithoutClassificationsInput)
  create?: DepartmentCreateWithoutClassificationsInput;

  @Field(() => DepartmentCreateOrConnectWithoutClassificationsInput, { nullable: true })
  @Type(() => DepartmentCreateOrConnectWithoutClassificationsInput)
  connectOrCreate?: DepartmentCreateOrConnectWithoutClassificationsInput;

  @Field(() => DepartmentUpsertWithoutClassificationsInput, { nullable: true })
  @Type(() => DepartmentUpsertWithoutClassificationsInput)
  upsert?: DepartmentUpsertWithoutClassificationsInput;

  @Field(() => DepartmentWhereUniqueInput, { nullable: true })
  @Type(() => DepartmentWhereUniqueInput)
  connect?: Prisma.AtLeast<DepartmentWhereUniqueInput, 'id'>;

  @Field(() => DepartmentUpdateToOneWithWhereWithoutClassificationsInput, { nullable: true })
  @Type(() => DepartmentUpdateToOneWithWhereWithoutClassificationsInput)
  update?: DepartmentUpdateToOneWithWhereWithoutClassificationsInput;
}
