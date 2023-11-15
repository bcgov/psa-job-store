import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';

@InputType()
export class PositionScalarWhereWithAggregatesInput {
  @Field(() => [PositionScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<PositionScalarWhereWithAggregatesInput>;

  @Field(() => [PositionScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<PositionScalarWhereWithAggregatesInput>;

  @Field(() => [PositionScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<PositionScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  department_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organization_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  supervisor_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  number?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  job_profile_number?: StringWithAggregatesFilter;

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  is_empty?: BoolWithAggregatesFilter;

  @Field(() => BoolWithAggregatesFilter, { nullable: true })
  is_vacant?: BoolWithAggregatesFilter;
}
