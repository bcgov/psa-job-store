import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyOrderByWithAggregationInput } from './job-profile-behavioural-competency-order-by-with-aggregation.input';
import { JobProfileBehaviouralCompetencyScalarFieldEnum } from './job-profile-behavioural-competency-scalar-field.enum';
import { JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput } from './job-profile-behavioural-competency-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCountAggregateInput } from './job-profile-behavioural-competency-count-aggregate.input';
import { JobProfileBehaviouralCompetencyAvgAggregateInput } from './job-profile-behavioural-competency-avg-aggregate.input';
import { JobProfileBehaviouralCompetencySumAggregateInput } from './job-profile-behavioural-competency-sum-aggregate.input';
import { JobProfileBehaviouralCompetencyMinAggregateInput } from './job-profile-behavioural-competency-min-aggregate.input';
import { JobProfileBehaviouralCompetencyMaxAggregateInput } from './job-profile-behavioural-competency-max-aggregate.input';

@ArgsType()
export class JobProfileBehaviouralCompetencyGroupByArgs {
  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereInput)
  where?: JobProfileBehaviouralCompetencyWhereInput;

  @Field(() => [JobProfileBehaviouralCompetencyOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileBehaviouralCompetencyOrderByWithAggregationInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileBehaviouralCompetencyScalarFieldEnum>;

  @Field(() => JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileBehaviouralCompetencyScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileBehaviouralCompetencyCountAggregateInput, { nullable: true })
  _count?: JobProfileBehaviouralCompetencyCountAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyAvgAggregateInput, { nullable: true })
  _avg?: JobProfileBehaviouralCompetencyAvgAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencySumAggregateInput, { nullable: true })
  _sum?: JobProfileBehaviouralCompetencySumAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyMinAggregateInput, { nullable: true })
  _min?: JobProfileBehaviouralCompetencyMinAggregateInput;

  @Field(() => JobProfileBehaviouralCompetencyMaxAggregateInput, { nullable: true })
  _max?: JobProfileBehaviouralCompetencyMaxAggregateInput;
}
