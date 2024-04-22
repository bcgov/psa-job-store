import { Field, InputType } from '@nestjs/graphql';
import { DepartmentWhereInput } from './department-where.input';

@InputType()
export class DepartmentRelationFilter {
  @Field(() => DepartmentWhereInput, { nullable: true })
  is?: DepartmentWhereInput;

  @Field(() => DepartmentWhereInput, { nullable: true })
  isNot?: DepartmentWhereInput;
}
