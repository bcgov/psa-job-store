import { Field, InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class JobProfileJobFamilyLinkScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileJobFamilyLinkScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyLinkScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyLinkScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileJobFamilyLinkScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyLinkScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  jobProfileId?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  jobFamilyId?: IntWithAggregatesFilter;
}
