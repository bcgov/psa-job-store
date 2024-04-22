import { Field, InputType } from '@nestjs/graphql';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class OrganizationScalarWhereWithAggregatesInput {
  @Field(() => [OrganizationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<OrganizationScalarWhereWithAggregatesInput>;

  @Field(() => [OrganizationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<OrganizationScalarWhereWithAggregatesInput>;

  @Field(() => [OrganizationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<OrganizationScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

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
