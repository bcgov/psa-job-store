import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class JobProfileOrganizationScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileOrganizationScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileOrganizationScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileOrganizationScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileOrganizationScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileOrganizationScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileOrganizationScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  organization_id?: StringWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;
}
