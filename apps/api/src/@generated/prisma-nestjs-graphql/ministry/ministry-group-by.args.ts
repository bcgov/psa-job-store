import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { MinistryWhereInput } from './ministry-where.input';
import { Type } from 'class-transformer';
import { MinistryOrderByWithAggregationInput } from './ministry-order-by-with-aggregation.input';
import { MinistryScalarFieldEnum } from './ministry-scalar-field.enum';
import { MinistryScalarWhereWithAggregatesInput } from './ministry-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { MinistryCountAggregateInput } from './ministry-count-aggregate.input';
import { MinistryAvgAggregateInput } from './ministry-avg-aggregate.input';
import { MinistrySumAggregateInput } from './ministry-sum-aggregate.input';
import { MinistryMinAggregateInput } from './ministry-min-aggregate.input';
import { MinistryMaxAggregateInput } from './ministry-max-aggregate.input';

@ArgsType()
export class MinistryGroupByArgs {
  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;

  @Field(() => [MinistryOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<MinistryOrderByWithAggregationInput>;

  @Field(() => [MinistryScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof MinistryScalarFieldEnum>;

  @Field(() => MinistryScalarWhereWithAggregatesInput, { nullable: true })
  having?: MinistryScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => MinistryCountAggregateInput, { nullable: true })
  _count?: MinistryCountAggregateInput;

  @Field(() => MinistryAvgAggregateInput, { nullable: true })
  _avg?: MinistryAvgAggregateInput;

  @Field(() => MinistrySumAggregateInput, { nullable: true })
  _sum?: MinistrySumAggregateInput;

  @Field(() => MinistryMinAggregateInput, { nullable: true })
  _min?: MinistryMinAggregateInput;

  @Field(() => MinistryMaxAggregateInput, { nullable: true })
  _max?: MinistryMaxAggregateInput;
}
