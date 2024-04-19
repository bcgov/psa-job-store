import { Field, InputType } from '@nestjs/graphql';
import { EmployeeGroupOrderByWithRelationAndSearchRelevanceInput } from '../employee-group/employee-group-order-by-with-relation-and-search-relevance.input';
import { JobProfileClassificationOrderByRelationAggregateInput } from '../job-profile-classification/job-profile-classification-order-by-relation-aggregate.input';
import { JobProfileReportsToOrderByRelationAggregateInput } from '../job-profile-reports-to/job-profile-reports-to-order-by-relation-aggregate.input';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByRelevanceInput } from './classification-order-by-relevance.input';

@InputType()
export class ClassificationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  peoplesoft_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  employee_group_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  grade?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_status?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  effective_date?: keyof typeof SortOrder;

  @Field(() => EmployeeGroupOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  employee_group?: EmployeeGroupOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileClassificationOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileClassificationOrderByRelationAggregateInput;

  @Field(() => JobProfileReportsToOrderByRelationAggregateInput, { nullable: true })
  reportees?: JobProfileReportsToOrderByRelationAggregateInput;

  @Field(() => ClassificationOrderByRelevanceInput, { nullable: true })
  _relevance?: ClassificationOrderByRelevanceInput;
}
