import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileBehaviouralCompetencyOrderByRelationAggregateInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-order-by-relation-aggregate.input';
import { JobProfileReportsToOrderByRelationAggregateInput } from '../job-profile-reports-to/job-profile-reports-to-order-by-relation-aggregate.input';
import { JobCategoryOrderByWithRelationAndSearchRelevanceInput } from '../job-category/job-category-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByRelationAggregateInput } from './job-profile-order-by-relation-aggregate.input';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { JobFamilyOrderByWithRelationAndSearchRelevanceInput } from '../job-family/job-family-order-by-with-relation-and-search-relevance.input';
import { MinistryOrderByWithRelationAndSearchRelevanceInput } from '../ministry/ministry-order-by-with-relation-and-search-relevance.input';
import { UserOrderByWithRelationAndSearchRelevanceInput } from '../user/user-order-by-with-relation-and-search-relevance.input';
import { JobRoleOrderByWithRelationAndSearchRelevanceInput } from '../job-role/job-role-order-by-with-relation-and-search-relevance.input';
import { JobProfileOrderByRelevanceInput } from './job-profile-order-by-relevance.input';

@InputType()
export class JobProfileOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  category_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  family_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  ministry_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  owner_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  parent_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  role_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  state?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  stream?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  number?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  context?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  accountabilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirements?: keyof typeof SortOrder;

  @Field(() => JobProfileBehaviouralCompetencyOrderByRelationAggregateInput, { nullable: true })
  behavioural_competencies?: JobProfileBehaviouralCompetencyOrderByRelationAggregateInput;

  @Field(() => JobProfileReportsToOrderByRelationAggregateInput, { nullable: true })
  reports_to?: JobProfileReportsToOrderByRelationAggregateInput;

  @Field(() => JobCategoryOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  category?: JobCategoryOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  children?: JobProfileOrderByRelationAggregateInput;

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobFamilyOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  family?: JobFamilyOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => MinistryOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  ministry?: MinistryOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => UserOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  owner?: UserOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  parent?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobRoleOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  role?: JobRoleOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileOrderByRelevanceInput, { nullable: true })
  _relevance?: JobProfileOrderByRelevanceInput;
}
