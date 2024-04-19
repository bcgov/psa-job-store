import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { EmployeeGroupCountAggregateInput } from './employee-group-count-aggregate.input';
import { EmployeeGroupMaxAggregateInput } from './employee-group-max-aggregate.input';
import { EmployeeGroupMinAggregateInput } from './employee-group-min-aggregate.input';
import { EmployeeGroupOrderByWithAggregationInput } from './employee-group-order-by-with-aggregation.input';
import { EmployeeGroupScalarFieldEnum } from './employee-group-scalar-field.enum';
import { EmployeeGroupScalarWhereWithAggregatesInput } from './employee-group-scalar-where-with-aggregates.input';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@ArgsType()
export class EmployeeGroupGroupByArgs {
  @Field(() => EmployeeGroupWhereInput, { nullable: true })
  @Type(() => EmployeeGroupWhereInput)
  where?: EmployeeGroupWhereInput;

  @Field(() => [EmployeeGroupOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<EmployeeGroupOrderByWithAggregationInput>;

  @Field(() => [EmployeeGroupScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof EmployeeGroupScalarFieldEnum>;

  @Field(() => EmployeeGroupScalarWhereWithAggregatesInput, { nullable: true })
  having?: EmployeeGroupScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => EmployeeGroupCountAggregateInput, { nullable: true })
  _count?: EmployeeGroupCountAggregateInput;

  @Field(() => EmployeeGroupMinAggregateInput, { nullable: true })
  _min?: EmployeeGroupMinAggregateInput;

  @Field(() => EmployeeGroupMaxAggregateInput, { nullable: true })
  _max?: EmployeeGroupMaxAggregateInput;
}
