import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ProfessionalDesignationCountOrderByAggregateInput } from './professional-designation-count-order-by-aggregate.input';
import { ProfessionalDesignationAvgOrderByAggregateInput } from './professional-designation-avg-order-by-aggregate.input';
import { ProfessionalDesignationMaxOrderByAggregateInput } from './professional-designation-max-order-by-aggregate.input';
import { ProfessionalDesignationMinOrderByAggregateInput } from './professional-designation-min-order-by-aggregate.input';
import { ProfessionalDesignationSumOrderByAggregateInput } from './professional-designation-sum-order-by-aggregate.input';

@InputType()
export class ProfessionalDesignationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  employee_group_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  name?: keyof typeof SortOrder;

  @Field(() => ProfessionalDesignationCountOrderByAggregateInput, { nullable: true })
  _count?: ProfessionalDesignationCountOrderByAggregateInput;

  @Field(() => ProfessionalDesignationAvgOrderByAggregateInput, { nullable: true })
  _avg?: ProfessionalDesignationAvgOrderByAggregateInput;

  @Field(() => ProfessionalDesignationMaxOrderByAggregateInput, { nullable: true })
  _max?: ProfessionalDesignationMaxOrderByAggregateInput;

  @Field(() => ProfessionalDesignationMinOrderByAggregateInput, { nullable: true })
  _min?: ProfessionalDesignationMinOrderByAggregateInput;

  @Field(() => ProfessionalDesignationSumOrderByAggregateInput, { nullable: true })
  _sum?: ProfessionalDesignationSumOrderByAggregateInput;
}
