import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { EmployeeRelationFilter } from '../employee/employee-relation-filter.input';
import { PositionRelationFilter } from '../position/position-relation-filter.input';

@InputType()
export class PositionEmployeeWhereInput {
  @Field(() => [PositionEmployeeWhereInput], { nullable: true })
  AND?: Array<PositionEmployeeWhereInput>;

  @Field(() => [PositionEmployeeWhereInput], { nullable: true })
  OR?: Array<PositionEmployeeWhereInput>;

  @Field(() => [PositionEmployeeWhereInput], { nullable: true })
  NOT?: Array<PositionEmployeeWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  employee_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  position_id?: StringFilter;

  @Field(() => EmployeeRelationFilter, { nullable: true })
  employee?: EmployeeRelationFilter;

  @Field(() => PositionRelationFilter, { nullable: true })
  position?: PositionRelationFilter;
}
