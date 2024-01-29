import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileBehaviouralCompetencyOrderByRelationAggregateInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-order-by-relation-aggregate.input';
import { JobProfileClassificationOrderByRelationAggregateInput } from '../job-profile-classification/job-profile-classification-order-by-relation-aggregate.input';
import { JobProfileOrganizationOrderByRelationAggregateInput } from '../job-profile-organization/job-profile-organization-order-by-relation-aggregate.input';
import { JobProfileContextOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-context/job-profile-context-order-by-with-relation-and-search-relevance.input';
import { JobProfileRoleOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-role/job-profile-role-order-by-with-relation-and-search-relevance.input';
import { JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-role-type/job-profile-role-type-order-by-with-relation-and-search-relevance.input';
import { JobProfileScopeOrderByWithRelationAndSearchRelevanceInput } from '../job-profile-scope/job-profile-scope-order-by-with-relation-and-search-relevance.input';
import { UserOrderByWithRelationAndSearchRelevanceInput } from '../user/user-order-by-with-relation-and-search-relevance.input';
import { JobProfileJobFamilyLinkOrderByRelationAggregateInput } from '../job-profile-job-family-link/job-profile-job-family-link-order-by-relation-aggregate.input';
import { JobProfileStreamLinkOrderByRelationAggregateInput } from '../job-profile-stream-link/job-profile-stream-link-order-by-relation-aggregate.input';
import { JobProfileReportsToOrderByRelationAggregateInput } from '../job-profile-reports-to/job-profile-reports-to-order-by-relation-aggregate.input';
import { PositionRequestOrderByRelationAggregateInput } from '../position-request/position-request-order-by-relation-aggregate.input';
import { JobProfileOrderByRelevanceInput } from './job-profile-order-by-relevance.input';

@InputType()
export class JobProfileOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  all_organizations?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  all_reports_to?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  role_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  role_type_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  scope_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  state?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  type?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  updated_at?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  owner_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  program_overview?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  review_required?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  accountabilities?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  requirements?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  professional_registration_requirements?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  preferences?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  knowledge_skills_abilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  willingness_statements?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  security_screenings?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  total_comp_create_form_misc?: SortOrderInput;

  @Field(() => JobProfileBehaviouralCompetencyOrderByRelationAggregateInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyOrderByRelationAggregateInput;

  @Field(() => JobProfileClassificationOrderByRelationAggregateInput, { nullable: true })
  classifications?: JobProfileClassificationOrderByRelationAggregateInput;

  @Field(() => JobProfileOrganizationOrderByRelationAggregateInput, { nullable: true })
  organizations?: JobProfileOrganizationOrderByRelationAggregateInput;

  @Field(() => JobProfileContextOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  context?: JobProfileContextOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileRoleOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  role?: JobProfileRoleOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  role_type?: JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileScopeOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  scope?: JobProfileScopeOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => UserOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  owner?: UserOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileJobFamilyLinkOrderByRelationAggregateInput, { nullable: true })
  jobFamilies?: JobProfileJobFamilyLinkOrderByRelationAggregateInput;

  @Field(() => JobProfileStreamLinkOrderByRelationAggregateInput, { nullable: true })
  streams?: JobProfileStreamLinkOrderByRelationAggregateInput;

  @Field(() => JobProfileReportsToOrderByRelationAggregateInput, { nullable: true })
  reports_to?: JobProfileReportsToOrderByRelationAggregateInput;

  @Field(() => PositionRequestOrderByRelationAggregateInput, { nullable: true })
  position_request?: PositionRequestOrderByRelationAggregateInput;

  @Field(() => JobProfileOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileOrderByRelevanceInput;
}
