import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { EmployeeGroupOrderByWithRelationAndSearchRelevanceInput } from '../employee-group/employee-group-order-by-with-relation-and-search-relevance.input';
import { JobProfileProfessionalDesignationOrderByRelationAggregateInput } from '../job-profile-professional-designation/job-profile-professional-designation-order-by-relation-aggregate.input';
import { ProfessionalDesignationOrderByRelevanceInput } from './professional-designation-order-by-relevance.input';

@InputType()
export class ProfessionalDesignationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  employee_group_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => EmployeeGroupOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  employee_group?: EmployeeGroupOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => JobProfileProfessionalDesignationOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileProfessionalDesignationOrderByRelationAggregateInput;

  @Field(() => ProfessionalDesignationOrderByRelevanceInput, { nullable: true })
  _relevance?: ProfessionalDesignationOrderByRelevanceInput;
}
