import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobRoleWhereInput } from './job-role-where.input';
import { Type } from 'class-transformer';
import { JobRoleOrderByWithRelationAndSearchRelevanceInput } from './job-role-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobRoleWhereUniqueInput } from './job-role-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobRoleCountAggregateInput } from './job-role-count-aggregate.input';
import { JobRoleAvgAggregateInput } from './job-role-avg-aggregate.input';
import { JobRoleSumAggregateInput } from './job-role-sum-aggregate.input';
import { JobRoleMinAggregateInput } from './job-role-min-aggregate.input';
import { JobRoleMaxAggregateInput } from './job-role-max-aggregate.input';

@ArgsType()
export class JobRoleAggregateArgs {
  @Field(() => JobRoleWhereInput, { nullable: true })
  @Type(() => JobRoleWhereInput)
  where?: JobRoleWhereInput;

  @Field(() => [JobRoleOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobRoleOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobRoleWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobRoleWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobRoleCountAggregateInput, { nullable: true })
  _count?: JobRoleCountAggregateInput;

  @Field(() => JobRoleAvgAggregateInput, { nullable: true })
  _avg?: JobRoleAvgAggregateInput;

  @Field(() => JobRoleSumAggregateInput, { nullable: true })
  _sum?: JobRoleSumAggregateInput;

  @Field(() => JobRoleMinAggregateInput, { nullable: true })
  _min?: JobRoleMinAggregateInput;

  @Field(() => JobRoleMaxAggregateInput, { nullable: true })
  _max?: JobRoleMaxAggregateInput;
}
