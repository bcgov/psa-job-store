import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { JobProfileCountOrderByAggregateInput } from './job-profile-count-order-by-aggregate.input';
import { JobProfileAvgOrderByAggregateInput } from './job-profile-avg-order-by-aggregate.input';
import { JobProfileMaxOrderByAggregateInput } from './job-profile-max-order-by-aggregate.input';
import { JobProfileMinOrderByAggregateInput } from './job-profile-min-order-by-aggregate.input';
import { JobProfileSumOrderByAggregateInput } from './job-profile-sum-order-by-aggregate.input';

@InputType()
export class JobProfileOrderByWithAggregationInput {
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
  education?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  job_experience?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  professional_registration_requirements?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  preferences?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  knowledge_skills_abilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  willingness_statements?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  optional_requirements?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  security_screenings?: SortOrderInput;

  @Field(() => SortOrderInput, { nullable: true })
  total_comp_create_form_misc?: SortOrderInput;

  @Field(() => JobProfileCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileCountOrderByAggregateInput;

  @Field(() => JobProfileAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileAvgOrderByAggregateInput;

  @Field(() => JobProfileMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileMaxOrderByAggregateInput;

  @Field(() => JobProfileMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileMinOrderByAggregateInput;

  @Field(() => JobProfileSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileSumOrderByAggregateInput;
}
