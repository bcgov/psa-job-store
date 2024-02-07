import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationCreateWithoutDepartmentsInput } from './classification-create-without-departments.input';
import { Type } from 'class-transformer';
import { ClassificationCreateOrConnectWithoutDepartmentsInput } from './classification-create-or-connect-without-departments.input';
import { ClassificationUpsertWithoutDepartmentsInput } from './classification-upsert-without-departments.input';
import { Prisma } from '@prisma/client';
import { ClassificationWhereUniqueInput } from './classification-where-unique.input';
import { ClassificationUpdateToOneWithWhereWithoutDepartmentsInput } from './classification-update-to-one-with-where-without-departments.input';

@InputType()
export class ClassificationUpdateOneRequiredWithoutDepartmentsNestedInput {
  @Field(() => ClassificationCreateWithoutDepartmentsInput, { nullable: true })
  @Type(() => ClassificationCreateWithoutDepartmentsInput)
  create?: ClassificationCreateWithoutDepartmentsInput;

  @Field(() => ClassificationCreateOrConnectWithoutDepartmentsInput, { nullable: true })
  @Type(() => ClassificationCreateOrConnectWithoutDepartmentsInput)
  connectOrCreate?: ClassificationCreateOrConnectWithoutDepartmentsInput;

  @Field(() => ClassificationUpsertWithoutDepartmentsInput, { nullable: true })
  @Type(() => ClassificationUpsertWithoutDepartmentsInput)
  upsert?: ClassificationUpsertWithoutDepartmentsInput;

  @Field(() => ClassificationWhereUniqueInput, { nullable: true })
  @Type(() => ClassificationWhereUniqueInput)
  connect?: Prisma.AtLeast<ClassificationWhereUniqueInput, 'id'>;

  @Field(() => ClassificationUpdateToOneWithWhereWithoutDepartmentsInput, { nullable: true })
  @Type(() => ClassificationUpdateToOneWithWhereWithoutDepartmentsInput)
  update?: ClassificationUpdateToOneWithWhereWithoutDepartmentsInput;
}
