import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class EmployeeGroupScalarWhereWithAggregatesInput {
  @Field(() => [EmployeeGroupScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<EmployeeGroupScalarWhereWithAggregatesInput>;

  @Field(() => [EmployeeGroupScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<EmployeeGroupScalarWhereWithAggregatesInput>;

  @Field(() => [EmployeeGroupScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<EmployeeGroupScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
