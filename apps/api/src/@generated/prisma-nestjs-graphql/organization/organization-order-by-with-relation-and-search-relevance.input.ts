import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { DepartmentOrderByRelationAggregateInput } from '../department/department-order-by-relation-aggregate.input';
import { JobProfileOrganizationOrderByRelationAggregateInput } from '../job-profile-organization/job-profile-organization-order-by-relation-aggregate.input';
import { OrganizationOrderByRelevanceInput } from './organization-order-by-relevance.input';

@InputType()
export class OrganizationOrderByWithRelationAndSearchRelevanceInput {
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

  @Field(() => JobProfileOrganizationOrderByRelationAggregateInput, { nullable: true })
  JobProfileOrganization?: JobProfileOrganizationOrderByRelationAggregateInput;

  @Field(() => OrganizationOrderByRelevanceInput, { nullable: true })
  _relevance?: OrganizationOrderByRelevanceInput;
}
