import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { EnumEmployeeStatusWithAggregatesFilter } from '../prisma/enum-employee-status-with-aggregates-filter.input';

@InputType()
export class EmployeeScalarWhereWithAggregatesInput {
  @Field(() => [EmployeeScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<EmployeeScalarWhereWithAggregatesInput>;

  @Field(() => [EmployeeScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<EmployeeScalarWhereWithAggregatesInput>;

  @Field(() => [EmployeeScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<EmployeeScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  department_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organization_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => EnumEmployeeStatusWithAggregatesFilter, { nullable: true })
  status?: EnumEmployeeStatusWithAggregatesFilter;
}
