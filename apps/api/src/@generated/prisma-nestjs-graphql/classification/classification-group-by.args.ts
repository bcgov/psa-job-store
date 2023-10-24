import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { Type } from 'class-transformer';
import { ClassificationOrderByWithAggregationInput } from './classification-order-by-with-aggregation.input';
import { ClassificationScalarFieldEnum } from './classification-scalar-field.enum';
import { ClassificationScalarWhereWithAggregatesInput } from './classification-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ClassificationCountAggregateInput } from './classification-count-aggregate.input';
import { ClassificationAvgAggregateInput } from './classification-avg-aggregate.input';
import { ClassificationSumAggregateInput } from './classification-sum-aggregate.input';
import { ClassificationMinAggregateInput } from './classification-min-aggregate.input';
import { ClassificationMaxAggregateInput } from './classification-max-aggregate.input';

@ArgsType()
export class ClassificationGroupByArgs {
  @Field(() => ClassificationWhereInput, { nullable: true })
  @Type(() => ClassificationWhereInput)
  where?: ClassificationWhereInput;

  @Field(() => [ClassificationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ClassificationOrderByWithAggregationInput>;

  @Field(() => [ClassificationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof ClassificationScalarFieldEnum>;

  @Field(() => ClassificationScalarWhereWithAggregatesInput, { nullable: true })
  having?: ClassificationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ClassificationCountAggregateInput, { nullable: true })
  _count?: ClassificationCountAggregateInput;

  @Field(() => ClassificationAvgAggregateInput, { nullable: true })
  _avg?: ClassificationAvgAggregateInput;

  @Field(() => ClassificationSumAggregateInput, { nullable: true })
  _sum?: ClassificationSumAggregateInput;

  @Field(() => ClassificationMinAggregateInput, { nullable: true })
  _min?: ClassificationMinAggregateInput;

  @Field(() => ClassificationMaxAggregateInput, { nullable: true })
  _max?: ClassificationMaxAggregateInput;
}
