import { Field, InputType } from '@nestjs/graphql';
import { CommentOrderByRelationAggregateInput } from '../comment/comment-order-by-relation-aggregate.input';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByRelevanceInput } from './user-order-by-relevance.input';

@InputType()
export class UserOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  name?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  email?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  username?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  roles?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  metadata?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => CommentOrderByRelationAggregateInput, { nullable: true })
  comments?: CommentOrderByRelationAggregateInput;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  JobProfile?: JobProfileOrderByRelationAggregateInput;

  @Field(() => UserOrderByRelevanceInput, { nullable: true })
  _relevance?: UserOrderByRelevanceInput;
}
