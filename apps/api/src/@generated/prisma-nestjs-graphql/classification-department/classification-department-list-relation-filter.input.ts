import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ClassificationDepartmentWhereInput } from './classification-department-where.input';

@InputType()
export class ClassificationDepartmentListRelationFilter {
  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  every?: ClassificationDepartmentWhereInput;

  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  some?: ClassificationDepartmentWhereInput;

  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  none?: ClassificationDepartmentWhereInput;
}
