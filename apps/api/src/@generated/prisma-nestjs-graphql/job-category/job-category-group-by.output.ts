import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobCategoryCountAggregate } from './job-category-count-aggregate.output';
import { JobCategoryAvgAggregate } from './job-category-avg-aggregate.output';
import { JobCategorySumAggregate } from './job-category-sum-aggregate.output';
import { JobCategoryMinAggregate } from './job-category-min-aggregate.output';
import { JobCategoryMaxAggregate } from './job-category-max-aggregate.output';

@ObjectType()
export class JobCategoryGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobCategoryCountAggregate, { nullable: true })
  _count?: JobCategoryCountAggregate;

  @Field(() => JobCategoryAvgAggregate, { nullable: true })
  _avg?: JobCategoryAvgAggregate;

  @Field(() => JobCategorySumAggregate, { nullable: true })
  _sum?: JobCategorySumAggregate;

  @Field(() => JobCategoryMinAggregate, { nullable: true })
  _min?: JobCategoryMinAggregate;

  @Field(() => JobCategoryMaxAggregate, { nullable: true })
  _max?: JobCategoryMaxAggregate;
}
