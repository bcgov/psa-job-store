import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CareerGroupWhereInput } from './career-group-where.input';
import { Type } from 'class-transformer';
import { CareerGroupOrderByWithAggregationInput } from './career-group-order-by-with-aggregation.input';
import { CareerGroupScalarFieldEnum } from './career-group-scalar-field.enum';
import { CareerGroupScalarWhereWithAggregatesInput } from './career-group-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CareerGroupCountAggregateInput } from './career-group-count-aggregate.input';
import { CareerGroupAvgAggregateInput } from './career-group-avg-aggregate.input';
import { CareerGroupSumAggregateInput } from './career-group-sum-aggregate.input';
import { CareerGroupMinAggregateInput } from './career-group-min-aggregate.input';
import { CareerGroupMaxAggregateInput } from './career-group-max-aggregate.input';

@ArgsType()
export class CareerGroupGroupByArgs {
  @Field(() => CareerGroupWhereInput, { nullable: true })
  @Type(() => CareerGroupWhereInput)
  where?: CareerGroupWhereInput;

  @Field(() => [CareerGroupOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<CareerGroupOrderByWithAggregationInput>;

  @Field(() => [CareerGroupScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof CareerGroupScalarFieldEnum>;

  @Field(() => CareerGroupScalarWhereWithAggregatesInput, { nullable: true })
  having?: CareerGroupScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => CareerGroupCountAggregateInput, { nullable: true })
  _count?: CareerGroupCountAggregateInput;

  @Field(() => CareerGroupAvgAggregateInput, { nullable: true })
  _avg?: CareerGroupAvgAggregateInput;

  @Field(() => CareerGroupSumAggregateInput, { nullable: true })
  _sum?: CareerGroupSumAggregateInput;

  @Field(() => CareerGroupMinAggregateInput, { nullable: true })
  _min?: CareerGroupMinAggregateInput;

  @Field(() => CareerGroupMaxAggregateInput, { nullable: true })
  _max?: CareerGroupMaxAggregateInput;
}
