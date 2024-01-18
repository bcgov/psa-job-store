import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileProfessionalDesignationCountOrderByAggregateInput } from './job-profile-professional-designation-count-order-by-aggregate.input';
import { JobProfileProfessionalDesignationAvgOrderByAggregateInput } from './job-profile-professional-designation-avg-order-by-aggregate.input';
import { JobProfileProfessionalDesignationMaxOrderByAggregateInput } from './job-profile-professional-designation-max-order-by-aggregate.input';
import { JobProfileProfessionalDesignationMinOrderByAggregateInput } from './job-profile-professional-designation-min-order-by-aggregate.input';
import { JobProfileProfessionalDesignationSumOrderByAggregateInput } from './job-profile-professional-designation-sum-order-by-aggregate.input';

@InputType()
export class JobProfileProfessionalDesignationOrderByWithAggregationInput {
  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  professional_designation_id?: keyof typeof SortOrder;

  @Field(() => JobProfileProfessionalDesignationCountOrderByAggregateInput, { nullable: true })
  _count?: JobProfileProfessionalDesignationCountOrderByAggregateInput;

  @Field(() => JobProfileProfessionalDesignationAvgOrderByAggregateInput, { nullable: true })
  _avg?: JobProfileProfessionalDesignationAvgOrderByAggregateInput;

  @Field(() => JobProfileProfessionalDesignationMaxOrderByAggregateInput, { nullable: true })
  _max?: JobProfileProfessionalDesignationMaxOrderByAggregateInput;

  @Field(() => JobProfileProfessionalDesignationMinOrderByAggregateInput, { nullable: true })
  _min?: JobProfileProfessionalDesignationMinOrderByAggregateInput;

  @Field(() => JobProfileProfessionalDesignationSumOrderByAggregateInput, { nullable: true })
  _sum?: JobProfileProfessionalDesignationSumOrderByAggregateInput;
}
