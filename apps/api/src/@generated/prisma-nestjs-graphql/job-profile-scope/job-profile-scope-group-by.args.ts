import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileScopeAvgAggregateInput } from './job-profile-scope-avg-aggregate.input';
import { JobProfileScopeCountAggregateInput } from './job-profile-scope-count-aggregate.input';
import { JobProfileScopeMaxAggregateInput } from './job-profile-scope-max-aggregate.input';
import { JobProfileScopeMinAggregateInput } from './job-profile-scope-min-aggregate.input';
import { JobProfileScopeOrderByWithAggregationInput } from './job-profile-scope-order-by-with-aggregation.input';
import { JobProfileScopeScalarFieldEnum } from './job-profile-scope-scalar-field.enum';
import { JobProfileScopeScalarWhereWithAggregatesInput } from './job-profile-scope-scalar-where-with-aggregates.input';
import { JobProfileScopeSumAggregateInput } from './job-profile-scope-sum-aggregate.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@ArgsType()
export class JobProfileScopeGroupByArgs {
  @Field(() => JobProfileScopeWhereInput, { nullable: true })
  @Type(() => JobProfileScopeWhereInput)
  where?: JobProfileScopeWhereInput;

  @Field(() => [JobProfileScopeOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<JobProfileScopeOrderByWithAggregationInput>;

  @Field(() => [JobProfileScopeScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof JobProfileScopeScalarFieldEnum>;

  @Field(() => JobProfileScopeScalarWhereWithAggregatesInput, { nullable: true })
  having?: JobProfileScopeScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileScopeCountAggregateInput, { nullable: true })
  _count?: JobProfileScopeCountAggregateInput;

  @Field(() => JobProfileScopeAvgAggregateInput, { nullable: true })
  _avg?: JobProfileScopeAvgAggregateInput;

  @Field(() => JobProfileScopeSumAggregateInput, { nullable: true })
  _sum?: JobProfileScopeSumAggregateInput;

  @Field(() => JobProfileScopeMinAggregateInput, { nullable: true })
  _min?: JobProfileScopeMinAggregateInput;

  @Field(() => JobProfileScopeMaxAggregateInput, { nullable: true })
  _max?: JobProfileScopeMaxAggregateInput;
}
