import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileBehaviouralCompetencyOrderByRelationAggregateInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-order-by-relation-aggregate.input';
import { JobProfileClassificationOrderByRelationAggregateInput } from '../job-profile-classification/job-profile-classification-order-by-relation-aggregate.input';
import { JobProfileOrganizationOrderByRelationAggregateInput } from '../job-profile-organization/job-profile-organization-order-by-relation-aggregate.input';
import { JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-career-group/job-profile-career-group-order-by-with-relation-and-search-relevance.input';
import { JobProfileContextOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-context/job-profile-context-order-by-with-relation-and-search-relevance.input';
import { JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-job-family/job-profile-job-family-order-by-with-relation-and-search-relevance.input';
import { JobProfileRoleOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-role/job-profile-role-order-by-with-relation-and-search-relevance.input';
import { JobProfileStreamOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-stream/job-profile-stream-order-by-with-relation-and-search-relevance.input';
import { UserOrderByWithRelationAndSearchRelevanceInput } from '../user/user-order-by-with-relation-and-search-relevance.input';
import { JobProfileReportsToOrderByRelationAggregateInput } from '../job-profile-reports-to/job-profile-reports-to-order-by-relation-aggregate.input';
import { PositionRequestOrderByRelationAggregateInput } from '../position-request/position-request-order-by-relation-aggregate.input';
import { JobProfileOrderByRelevanceInput } from './job-profile-order-by-relevance.input';

@InputType()
export class JobProfileOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  career_group_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_family_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  role_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  state?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  stream_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  type?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  updated_at?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  owner_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  accountabilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirements?: keyof typeof SortOrder;

  @Field(() => JobProfileBehaviouralCompetencyOrderByRelationAggregateInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyOrderByRelationAggregateInput;

  @Field(() => JobProfileClassificationOrderByRelationAggregateInput, { nullable: true })
  classifications?: JobProfileClassificationOrderByRelationAggregateInput;

  @Field(() => JobProfileOrganizationOrderByRelationAggregateInput, { nullable: true })
  organizations?: JobProfileOrganizationOrderByRelationAggregateInput;

  @Field(() => JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  career_group?: JobProfileCareerGroupOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileContextOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  context?: JobProfileContextOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  job_family?: JobProfileJobFamilyOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileRoleOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  role?: JobProfileRoleOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileStreamOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  stream?: JobProfileStreamOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => UserOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  owner?: UserOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileReportsToOrderByRelationAggregateInput, { nullable: true })
  reports_to?: JobProfileReportsToOrderByRelationAggregateInput;

  @Field(() => PositionRequestOrderByRelationAggregateInput, { nullable: true })
  position_request?: PositionRequestOrderByRelationAggregateInput;

  @Field(() => JobProfileOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileOrderByRelevanceInput;
}
