import { Field, InputType } from '@nestjs/graphql';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileRoleTypeOrderByRelevanceInput } from './job-profile-role-type-order-by-relevance.input';

@InputType()
export class JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileRoleTypeOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileRoleTypeOrderByRelevanceInput;
}
