import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrderByRelationAggregateInput } from '../job-profile/job-profile-order-by-relation-aggregate.input';
import { JobProfileReportsToOrderByRelationAggregateInput } from '../job-profile-reports-to/job-profile-reports-to-order-by-relation-aggregate.input';
import { EmployeeOrderByRelationAggregateInput } from '../employee/employee-order-by-relation-aggregate.input';
import { PositionOrderByRelationAggregateInput } from '../position/position-order-by-relation-aggregate.input';
import { ClassificationOrderByRelevanceInput } from './classification-order-by-relevance.input';

@InputType()
export class ClassificationOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  code?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => JobProfileOrderByRelationAggregateInput, { nullable: true })
  job_profiles?: JobProfileOrderByRelationAggregateInput;

  @Field(() => JobProfileReportsToOrderByRelationAggregateInput, { nullable: true })
  reportees?: JobProfileReportsToOrderByRelationAggregateInput;

  @Field(() => EmployeeOrderByRelationAggregateInput, { nullable: true })
  employees?: EmployeeOrderByRelationAggregateInput;

  @Field(() => PositionOrderByRelationAggregateInput, { nullable: true })
  positions?: PositionOrderByRelationAggregateInput;

  @Field(() => ClassificationOrderByRelevanceInput, { nullable: true })
  _relevance?: ClassificationOrderByRelevanceInput;
}
