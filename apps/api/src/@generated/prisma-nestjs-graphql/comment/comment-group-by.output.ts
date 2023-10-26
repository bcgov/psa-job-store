import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentCountAggregate } from './comment-count-aggregate.output';
import { CommentAvgAggregate } from './comment-avg-aggregate.output';
import { CommentSumAggregate } from './comment-sum-aggregate.output';
import { CommentMinAggregate } from './comment-min-aggregate.output';
import { CommentMaxAggregate } from './comment-max-aggregate.output';

@ObjectType()
export class CommentGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  author_id!: string;

  @Field(() => Int, { nullable: false })
  record_id!: number;

  @Field(() => String, { nullable: false })
  record_type!: string;

  @Field(() => String, { nullable: false })
  text!: string;

  @Field(() => Date, { nullable: false })
  created_at!: Date | string;

  @Field(() => Date, { nullable: false })
  updated_at!: Date | string;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => CommentCountAggregate, { nullable: true })
  _count?: CommentCountAggregate;

  @Field(() => CommentAvgAggregate, { nullable: true })
  _avg?: CommentAvgAggregate;

  @Field(() => CommentSumAggregate, { nullable: true })
  _sum?: CommentSumAggregate;

  @Field(() => CommentMinAggregate, { nullable: true })
  _min?: CommentMinAggregate;

  @Field(() => CommentMaxAggregate, { nullable: true })
  _max?: CommentMaxAggregate;
}
