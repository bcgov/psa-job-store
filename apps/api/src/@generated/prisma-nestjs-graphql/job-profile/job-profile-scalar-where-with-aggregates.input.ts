import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { EnumJobProfileStateWithAggregatesFilter } from '../prisma/enum-job-profile-state-with-aggregates-filter.input';
import { EnumJobStreamWithAggregatesFilter } from '../prisma/enum-job-stream-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { JsonWithAggregatesFilter } from '../prisma/json-with-aggregates-filter.input';
import { StringListFilter } from '../prisma/string-list-filter.input';

@InputType()
export class JobProfileScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  career_group_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  classification_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  family_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  ministry_id?: IntWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  owner_id?: UuidWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  parent_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  role_id?: IntWithAggregatesFilter;

  @Field(() => EnumJobProfileStateWithAggregatesFilter, { nullable: true })
  state?: EnumJobProfileStateWithAggregatesFilter;

  @Field(() => EnumJobStreamWithAggregatesFilter, { nullable: true })
  stream?: EnumJobStreamWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  title?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  number?: IntWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  context?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  overview?: StringWithAggregatesFilter;

  @Field(() => JsonWithAggregatesFilter, { nullable: true })
  accountabilities?: JsonWithAggregatesFilter;

  @Field(() => StringListFilter, { nullable: true })
  requirements?: StringListFilter;
}
