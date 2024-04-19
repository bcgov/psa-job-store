import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { PositionRequestAvgAggregateInput } from './position-request-avg-aggregate.input';
import { PositionRequestCountAggregateInput } from './position-request-count-aggregate.input';
import { PositionRequestMaxAggregateInput } from './position-request-max-aggregate.input';
import { PositionRequestMinAggregateInput } from './position-request-min-aggregate.input';
import { PositionRequestOrderByWithAggregationInput } from './position-request-order-by-with-aggregation.input';
import { PositionRequestScalarFieldEnum } from './position-request-scalar-field.enum';
import { PositionRequestScalarWhereWithAggregatesInput } from './position-request-scalar-where-with-aggregates.input';
import { PositionRequestSumAggregateInput } from './position-request-sum-aggregate.input';
import { PositionRequestWhereInput } from './position-request-where.input';

@ArgsType()
export class PositionRequestGroupByArgs {
  @Field(() => PositionRequestWhereInput, { nullable: true })
  @Type(() => PositionRequestWhereInput)
  where?: PositionRequestWhereInput;

  @Field(() => [PositionRequestOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<PositionRequestOrderByWithAggregationInput>;

  @Field(() => [PositionRequestScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof PositionRequestScalarFieldEnum>;

  @Field(() => PositionRequestScalarWhereWithAggregatesInput, { nullable: true })
  having?: PositionRequestScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => PositionRequestCountAggregateInput, { nullable: true })
  _count?: PositionRequestCountAggregateInput;

  @Field(() => PositionRequestAvgAggregateInput, { nullable: true })
  _avg?: PositionRequestAvgAggregateInput;

  @Field(() => PositionRequestSumAggregateInput, { nullable: true })
  _sum?: PositionRequestSumAggregateInput;

  @Field(() => PositionRequestMinAggregateInput, { nullable: true })
  _min?: PositionRequestMinAggregateInput;

  @Field(() => PositionRequestMaxAggregateInput, { nullable: true })
  _max?: PositionRequestMaxAggregateInput;
}
