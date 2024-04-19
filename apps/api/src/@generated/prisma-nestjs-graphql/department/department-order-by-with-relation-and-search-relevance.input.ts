import { Field, InputType } from '@nestjs/graphql';
import { LocationOrderByWithRelationAndSearchRelevanceInput } from '../location/location-order-by-with-relation-and-search-relevance.input';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from '../organization/organization-order-by-with-relation-and-search-relevance.input';
import { PositionRequestOrderByRelationAggregateInput } from '../position-request/position-request-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { DepartmentOrderByRelevanceInput } from './department-order-by-relevance.input';

@InputType()
export class DepartmentOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  location_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  organization_id?: keyof typeof SortOrder;

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

  @Field(() => LocationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  location?: LocationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => OrganizationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  organization?: OrganizationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionRequestOrderByRelationAggregateInput, { nullable: true })
  PositionRequest?: PositionRequestOrderByRelationAggregateInput;

  @Field(() => PositionRequestOrderByRelationAggregateInput, { nullable: true })
  PositionRequestsByPaylistDepartment?: PositionRequestOrderByRelationAggregateInput;

  @Field(() => DepartmentOrderByRelevanceInput, { nullable: true })
  _relevance?: DepartmentOrderByRelevanceInput;
}
