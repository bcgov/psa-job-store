import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentListRelationFilter {
  @Field(() => DepartmentWhereInput, { nullable: true })
  every?: DepartmentWhereInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  some?: DepartmentWhereInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  none?: DepartmentWhereInput;
}
