import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@InputType()
export class EmployeeGroupRelationFilter {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  is?: EmployeeGroupWhereInput;

  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  isNot?: EmployeeGroupWhereInput;
}
