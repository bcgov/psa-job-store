import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { GridOrderByWithRelationAndSearchRelevanceInput } from '../grid/grid-order-by-with-relation-and-search-relevance.input';
import { OccupationGroupOrderByWithRelationAndSearchRelevanceInput } from '../occupation-group/occupation-group-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { JobProfileReportsToOrderByRelationAggregateInput } from '../job-profile-reports-to/job-profile-reports-to-order-by-relation-aggregate.input';

@InputType()
export class ClassificationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grid_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  occupation_group_id?: keyof typeof SortOrder;

  @Field(() => GridOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  grid?: GridOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => OccupationGroupOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  occupation_group?: OccupationGroupOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileReportsToOrderByRelationAggregateInput, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToOrderByRelationAggregateInput;
}
