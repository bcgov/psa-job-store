import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobFamilyScalarWhereWithAggregatesInput {
  @Field(() => [JobFamilyScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobFamilyScalarWhereWithAggregatesInput>;

  @Field(() => [JobFamilyScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobFamilyScalarWhereWithAggregatesInput>;

  @Field(() => [JobFamilyScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobFamilyScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
