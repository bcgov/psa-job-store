import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileCareerGroupScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileCareerGroupScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileCareerGroupScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileCareerGroupScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileCareerGroupScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileCareerGroupScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileCareerGroupScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
