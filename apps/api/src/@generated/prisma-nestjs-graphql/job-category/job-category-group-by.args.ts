import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobCategoryWhereInput } from './job-category-where.input';
import { Type } from 'class-transformer';
import { JobCategoryOrderByWithAggregationInput } from './job-category-order-by-with-aggregation.input';
import { JobCategoryScalarFieldEnum } from './job-category-scalar-field.enum';
import { JobCategoryScalarWhereWithAggregatesInput } from './job-category-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobCategoryCountAggregateInput } from './job-category-count-aggregate.input';
import { JobCategoryAvgAggregateInput } from './job-category-avg-aggregate.input';
import { JobCategorySumAggregateInput } from './job-category-sum-aggregate.input';
import { JobCategoryMinAggregateInput } from './job-category-min-aggregate.input';
import { JobCategoryMaxAggregateInput } from './job-category-max-aggregate.input';

@ArgsType()
export class JobCategoryGroupByArgs {
  @Field(() => JobCategoryWhereInput, { nullable: true })
  @Type(() => JobCategoryWhereInput)
  where?: JobCategoryWhereInput;

  @Field(() => [JobCategoryOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobCategoryOrderByWithAggregationInput>;

  @Field(() => [JobCategoryScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobCategoryScalarFieldEnum>;

  @Field(() => JobCategoryScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobCategoryScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobCategoryCountAggregateInput, { nullable: true })
  _count?: JobCategoryCountAggregateInput;

  @Field(() => JobCategoryAvgAggregateInput, { nullable: true })
  _avg?: JobCategoryAvgAggregateInput;

  @Field(() => JobCategorySumAggregateInput, { nullable: true })
  _sum?: JobCategorySumAggregateInput;

  @Field(() => JobCategoryMinAggregateInput, { nullable: true })
  _min?: JobCategoryMinAggregateInput;

  @Field(() => JobCategoryMaxAggregateInput, { nullable: true })
  _max?: JobCategoryMaxAggregateInput;
}
