import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { GridWhereInput } from './grid-where.input';
import { Type } from 'class-transformer';
import { GridOrderByWithAggregationInput } from './grid-order-by-with-aggregation.input';
import { GridScalarFieldEnum } from './grid-scalar-field.enum';
import { GridScalarWhereWithAggregatesInput } from './grid-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { GridCountAggregateInput } from './grid-count-aggregate.input';
import { GridAvgAggregateInput } from './grid-avg-aggregate.input';
import { GridSumAggregateInput } from './grid-sum-aggregate.input';
import { GridMinAggregateInput } from './grid-min-aggregate.input';
import { GridMaxAggregateInput } from './grid-max-aggregate.input';

@ArgsType()
export class GridGroupByArgs {
  @Field(() => GridWhereInput, { nullable: true })
  @Type(() => GridWhereInput)
  where?: GridWhereInput;

  @Field(() => [GridOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<GridOrderByWithAggregationInput>;

  @Field(() => [GridScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof GridScalarFieldEnum>;

  @Field(() => GridScalarWhereWithAggregatesInput, { nullable: true })
  having?: GridScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => GridCountAggregateInput, { nullable: true })
  _count?: GridCountAggregateInput;

  @Field(() => GridAvgAggregateInput, { nullable: true })
  _avg?: GridAvgAggregateInput;

  @Field(() => GridSumAggregateInput, { nullable: true })
  _sum?: GridSumAggregateInput;

  @Field(() => GridMinAggregateInput, { nullable: true })
  _min?: GridMinAggregateInput;

  @Field(() => GridMaxAggregateInput, { nullable: true })
  _max?: GridMaxAggregateInput;
}
