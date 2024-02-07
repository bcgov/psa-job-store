import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentUncheckedUpdateManyInput } from './classification-department-unchecked-update-many.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentWhereInput } from './classification-department-where.input';

@ArgsType()
export class UpdateManyClassificationDepartmentArgs {
  @Field(() => ClassificationDepartmentUncheckedUpdateManyInput, { nullable: false })
  @Type(() => ClassificationDepartmentUncheckedUpdateManyInput)
  data!: ClassificationDepartmentUncheckedUpdateManyInput;

  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  @Type(() => ClassificationDepartmentWhereInput)
  where?: ClassificationDepartmentWhereInput;
}
