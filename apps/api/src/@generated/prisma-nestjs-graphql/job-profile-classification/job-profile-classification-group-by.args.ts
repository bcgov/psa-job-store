import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileClassificationAvgAggregateInput } from './job-profile-classification-avg-aggregate.input';
import { JobProfileClassificationCountAggregateInput } from './job-profile-classification-count-aggregate.input';
import { JobProfileClassificationMaxAggregateInput } from './job-profile-classification-max-aggregate.input';
import { JobProfileClassificationMinAggregateInput } from './job-profile-classification-min-aggregate.input';
import { JobProfileClassificationOrderByWithAggregationInput } from './job-profile-classification-order-by-with-aggregation.input';
import { JobProfileClassificationScalarFieldEnum } from './job-profile-classification-scalar-field.enum';
import { JobProfileClassificationScalarWhereWithAggregatesInput } from './job-profile-classification-scalar-where-with-aggregates.input';
import { JobProfileClassificationSumAggregateInput } from './job-profile-classification-sum-aggregate.input';
import { JobProfileClassificationWhereInput } from './job-profile-classification-where.input';

@ArgsType()
export class JobProfileClassificationGroupByArgs {
  @Field(() => JobProfileClassificationWhereInput, { nullable: true })
  @Type(() => JobProfileClassificationWhereInput)
  where?: JobProfileClassificationWhereInput;

  @Field(() => [JobProfileClassificationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileClassificationOrderByWithAggregationInput>;

  @Field(() => [JobProfileClassificationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileClassificationScalarFieldEnum>;

  @Field(() => JobProfileClassificationScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileClassificationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileClassificationCountAggregateInput, { nullable: true })
  _count?: JobProfileClassificationCountAggregateInput;

  @Field(() => JobProfileClassificationAvgAggregateInput, { nullable: true })
  _avg?: JobProfileClassificationAvgAggregateInput;

  @Field(() => JobProfileClassificationSumAggregateInput, { nullable: true })
  _sum?: JobProfileClassificationSumAggregateInput;

  @Field(() => JobProfileClassificationMinAggregateInput, { nullable: true })
  _min?: JobProfileClassificationMinAggregateInput;

  @Field(() => JobProfileClassificationMaxAggregateInput, { nullable: true })
  _max?: JobProfileClassificationMaxAggregateInput;
}
