import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentCreateInput } from './classification-department-create.input';
import { ClassificationDepartmentUpdateInput } from './classification-department-update.input';

@ArgsType()
export class UpsertOneClassificationDepartmentArgs {
  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;

  @Field(() => ClassificationDepartmentCreateInput, { nullable: false })
  @Type(() => ClassificationDepartmentCreateInput)
  create!: ClassificationDepartmentCreateInput;

  @Field(() => ClassificationDepartmentUpdateInput, { nullable: false })
  @Type(() => ClassificationDepartmentUpdateInput)
  update!: ClassificationDepartmentUpdateInput;
}
