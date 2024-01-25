import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileOrderByWithRelationAndSearchRelevanceInput } from '../job-profile/job-profile-order-by-with-relation-and-search-relevance.input';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from '../department/department-order-by-with-relation-and-search-relevance.input';
import { PositionRequestOrderByRelevanceInput } from './position-request-order-by-relevance.input';

@InputType()
export class PositionRequestOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  step?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  reports_to_position_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  department_id?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  parent_job_profile_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  profile_json?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  orgchart_json?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  user_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  classificationAssignedTo?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  title?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  position_number?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  classification_id?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  classification_code?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  user_name?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  email?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  submission_id?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  submitted_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  approved_at?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  status?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  parent_job_profile?: JobProfileOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => DepartmentOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  department?: DepartmentOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => PositionRequestOrderByRelevanceInput, { nullable: true })
  _relevance?: PositionRequestOrderByRelevanceInput;
}
