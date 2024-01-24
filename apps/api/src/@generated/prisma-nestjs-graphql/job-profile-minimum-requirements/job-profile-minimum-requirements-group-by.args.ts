import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsOrderByWithAggregationInput } from './job-profile-minimum-requirements-order-by-with-aggregation.input';
import { JobProfileMinimumRequirementsScalarFieldEnum } from './job-profile-minimum-requirements-scalar-field.enum';
import { JobProfileMinimumRequirementsScalarWhereWithAggregatesInput } from './job-profile-minimum-requirements-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsCountAggregateInput } from './job-profile-minimum-requirements-count-aggregate.input';
import { JobProfileMinimumRequirementsAvgAggregateInput } from './job-profile-minimum-requirements-avg-aggregate.input';
import { JobProfileMinimumRequirementsSumAggregateInput } from './job-profile-minimum-requirements-sum-aggregate.input';
import { JobProfileMinimumRequirementsMinAggregateInput } from './job-profile-minimum-requirements-min-aggregate.input';
import { JobProfileMinimumRequirementsMaxAggregateInput } from './job-profile-minimum-requirements-max-aggregate.input';

@ArgsType()
export class JobProfileMinimumRequirementsGroupByArgs {
  @Field(() => JobProfileMinimumRequirementsWhereInput, { nullable: true })
  @Type(() => JobProfileMinimumRequirementsWhereInput)
  where?: JobProfileMinimumRequirementsWhereInput;

  @Field(() => [JobProfileMinimumRequirementsOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileMinimumRequirementsOrderByWithAggregationInput>;

  @Field(() => [JobProfileMinimumRequirementsScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileMinimumRequirementsScalarFieldEnum>;

  @Field(() => JobProfileMinimumRequirementsScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileMinimumRequirementsScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileMinimumRequirementsCountAggregateInput, { nullable: true })
  _count?: JobProfileMinimumRequirementsCountAggregateInput;

  @Field(() => JobProfileMinimumRequirementsAvgAggregateInput, { nullable: true })
  _avg?: JobProfileMinimumRequirementsAvgAggregateInput;

  @Field(() => JobProfileMinimumRequirementsSumAggregateInput, { nullable: true })
  _sum?: JobProfileMinimumRequirementsSumAggregateInput;

  @Field(() => JobProfileMinimumRequirementsMinAggregateInput, { nullable: true })
  _min?: JobProfileMinimumRequirementsMinAggregateInput;

  @Field(() => JobProfileMinimumRequirementsMaxAggregateInput, { nullable: true })
  _max?: JobProfileMinimumRequirementsMaxAggregateInput;
}
