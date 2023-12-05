import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class ClassificationScalarWhereWithAggregatesInput {
  @Field(() => [ClassificationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ClassificationScalarWhereWithAggregatesInput>;

  @Field(() => [ClassificationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ClassificationScalarWhereWithAggregatesInput>;

  @Field(() => [ClassificationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ClassificationScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  code?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
