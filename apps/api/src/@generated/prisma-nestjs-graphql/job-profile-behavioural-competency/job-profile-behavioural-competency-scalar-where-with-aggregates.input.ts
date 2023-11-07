import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';

@InputType()
export class JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput {
  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput>;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  behavioural_competency_id?: IntWithAggregatesFilter;

  @Field(() => IntWithAggregatesFilter, { nullable: true })
  job_profile_id?: IntWithAggregatesFilter;
}
