import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { UuidWithAggregatesFilter } from '../prisma/uuid-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class IdentityScalarWhereWithAggregatesInput {
  @Field(() => [IdentityScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<IdentityScalarWhereWithAggregatesInput>;

  @Field(() => [IdentityScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<IdentityScalarWhereWithAggregatesInput>;

  @Field(() => [IdentityScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<IdentityScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  sub?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  identity_provider?: StringWithAggregatesFilter;

  @Field(() => UuidWithAggregatesFilter, { nullable: true })
  user_id?: UuidWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  created_at?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  updated_at?: DateTimeWithAggregatesFilter;

  @Field(() => DateTimeWithAggregatesFilter, { nullable: true })
  deleted_at?: DateTimeWithAggregatesFilter;
}
