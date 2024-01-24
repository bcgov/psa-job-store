import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class LocationScalarWhereWithAggregatesInput {
  @Field(() => [LocationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<LocationScalarWhereWithAggregatesInput>;

  @Field(() => [LocationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<LocationScalarWhereWithAggregatesInput>;

  @Field(() => [LocationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<LocationScalarWhereWithAggregatesInput>;

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
