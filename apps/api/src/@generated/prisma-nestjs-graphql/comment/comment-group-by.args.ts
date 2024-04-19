import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { CommentAvgAggregateInput } from './comment-avg-aggregate.input';
import { CommentCountAggregateInput } from './comment-count-aggregate.input';
import { CommentMaxAggregateInput } from './comment-max-aggregate.input';
import { CommentMinAggregateInput } from './comment-min-aggregate.input';
import { CommentOrderByWithAggregationInput } from './comment-order-by-with-aggregation.input';
import { CommentScalarFieldEnum } from './comment-scalar-field.enum';
import { CommentScalarWhereWithAggregatesInput } from './comment-scalar-where-with-aggregates.input';
import { CommentSumAggregateInput } from './comment-sum-aggregate.input';
import { CommentWhereInput } from './comment-where.input';

@ArgsType()
export class CommentGroupByArgs {
  @Field(() => CommentWhereInput, { nullable: true })
  @Type(() => CommentWhereInput)
  where?: CommentWhereInput;

  @Field(() => [CommentOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<CommentOrderByWithAggregationInput>;

  @Field(() => [CommentScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof CommentScalarFieldEnum>;

  @Field(() => CommentScalarWhereWithAggregatesInput, { nullable: true })
  having?: CommentScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => CommentCountAggregateInput, { nullable: true })
  _count?: CommentCountAggregateInput;

  @Field(() => CommentAvgAggregateInput, { nullable: true })
  _avg?: CommentAvgAggregateInput;

  @Field(() => CommentSumAggregateInput, { nullable: true })
  _sum?: CommentSumAggregateInput;

  @Field(() => CommentMinAggregateInput, { nullable: true })
  _min?: CommentMinAggregateInput;

  @Field(() => CommentMaxAggregateInput, { nullable: true })
  _max?: CommentMaxAggregateInput;
}
