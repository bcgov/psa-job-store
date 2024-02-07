import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentUpdateInput } from './classification-department-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { ClassificationDepartmentWhereUniqueInput } from './classification-department-where-unique.input';

@ArgsType()
export class UpdateOneClassificationDepartmentArgs {
  @Field(() => ClassificationDepartmentUpdateInput, { nullable: false })
  @Type(() => ClassificationDepartmentUpdateInput)
  data!: ClassificationDepartmentUpdateInput;

  @Field(() => ClassificationDepartmentWhereUniqueInput, { nullable: false })
  @Type(() => ClassificationDepartmentWhereUniqueInput)
  where!: Prisma.AtLeast<ClassificationDepartmentWhereUniqueInput, 'classification_id_department_id'>;
}
