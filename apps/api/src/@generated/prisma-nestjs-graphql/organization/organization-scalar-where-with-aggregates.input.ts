import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
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
  name?: StringWithAggregatesFilter;
}
