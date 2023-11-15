import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class DepartmentScalarWhereWithAggregatesInput {
  @Field(() => [DepartmentScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<DepartmentScalarWhereWithAggregatesInput>;

  @Field(() => [DepartmentScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<DepartmentScalarWhereWithAggregatesInput>;

  @Field(() => [DepartmentScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<DepartmentScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organization_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
