import { Field, InputType } from '@nestjs/graphql';
import { DepartmentOrderByRelationAggregateInput } from '../department/department-order-by-relation-aggregate.input';
import { PositionRequestOrderByRelationAggregateInput } from '../position-request/position-request-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { LocationOrderByRelevanceInput } from './location-order-by-relevance.input';

@InputType()
export class LocationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  peoplesoft_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_status?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_date?: keyof typeof SortOrder;

  @Field(() => DepartmentOrderByRelationAggregateInput, { nullable: true })
  departments?: DepartmentOrderByRelationAggregateInput;

  @Field(() => PositionRequestOrderByRelationAggregateInput, { nullable: true })
  positionRequests?: PositionRequestOrderByRelationAggregateInput;

  @Field(() => LocationOrderByRelevanceInput, { nullable: true })
  _relevance?: LocationOrderByRelevanceInput;
}
