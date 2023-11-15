import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PositionEmployeeWhereInput } from './position-employee-where.input';
import { Type } from 'class-transformer';
import { PositionEmployeeOrderByWithAggregationInput } from './position-employee-order-by-with-aggregation.input';
import { PositionEmployeeScalarFieldEnum } from './position-employee-scalar-field.enum';
import { PositionEmployeeScalarWhereWithAggregatesInput } from './position-employee-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { PositionEmployeeCountAggregateInput } from './position-employee-count-aggregate.input';
import { PositionEmployeeMinAggregateInput } from './position-employee-min-aggregate.input';
import { PositionEmployeeMaxAggregateInput } from './position-employee-max-aggregate.input';

@ArgsType()
export class PositionEmployeeGroupByArgs {
  @Field(() => PositionEmployeeWhereInput, { nullable: true })
  @Type(() => PositionEmployeeWhereInput)
  where?: PositionEmployeeWhereInput;

  @Field(() => [PositionEmployeeOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<PositionEmployeeOrderByWithAggregationInput>;

  @Field(() => [PositionEmployeeScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof PositionEmployeeScalarFieldEnum>;

  @Field(() => PositionEmployeeScalarWhereWithAggregatesInput, { nullable: true })
  having?: PositionEmployeeScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => PositionEmployeeCountAggregateInput, { nullable: true })
  _count?: PositionEmployeeCountAggregateInput;

  @Field(() => PositionEmployeeMinAggregateInput, { nullable: true })
  _min?: PositionEmployeeMinAggregateInput;

  @Field(() => PositionEmployeeMaxAggregateInput, { nullable: true })
  _max?: PositionEmployeeMaxAggregateInput;
}
