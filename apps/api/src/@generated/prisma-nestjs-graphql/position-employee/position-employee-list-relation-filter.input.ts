import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PositionEmployeeWhereInput } from './position-employee-where.input';

@InputType()
export class PositionEmployeeListRelationFilter {
  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  every?: PositionEmployeeWhereInput;

  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  some?: PositionEmployeeWhereInput;

  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  none?: PositionEmployeeWhereInput;
}
