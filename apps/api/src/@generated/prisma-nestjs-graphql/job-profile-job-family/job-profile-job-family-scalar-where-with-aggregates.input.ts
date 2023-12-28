import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileJobFamilyScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileJobFamilyScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileJobFamilyScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileJobFamilyScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  name?: StringWithAggregatesFilter;
}
