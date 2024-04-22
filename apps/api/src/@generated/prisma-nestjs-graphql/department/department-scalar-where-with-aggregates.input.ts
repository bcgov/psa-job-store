import { Field, InputType } from '@nestjs/graphql';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
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
  location_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organization_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  peoplesoft_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  code?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  effective_status?: StringWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  effective_date?: DateTimeWithAggregatesFilter;
}
