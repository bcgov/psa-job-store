import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleWhereInput } from './job-profile-role-where.input';
import { Type } from 'class-transformer';
import { JobProfileRoleOrderByWithRelationAndSearchRelevanceInput } from './job-profile-role-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileRoleWhereUniqueInput } from './job-profile-role-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleCountAggregateInput } from './job-profile-role-count-aggregate.input';
import { JobProfileRoleAvgAggregateInput } from './job-profile-role-avg-aggregate.input';
import { JobProfileRoleSumAggregateInput } from './job-profile-role-sum-aggregate.input';
import { JobProfileRoleMinAggregateInput } from './job-profile-role-min-aggregate.input';
import { JobProfileRoleMaxAggregateInput } from './job-profile-role-max-aggregate.input';

@ArgsType()
export class JobProfileRoleAggregateArgs {
  @Field(() => JobProfileRoleWhereInput, { nullable: true })
  @Type(() => JobProfileRoleWhereInput)
  where?: JobProfileRoleWhereInput;

  @Field(() => [JobProfileRoleOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileRoleOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileRoleWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileRoleWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileRoleCountAggregateInput, { nullable: true })
  _count?: JobProfileRoleCountAggregateInput;

  @Field(() => JobProfileRoleAvgAggregateInput, { nullable: true })
  _avg?: JobProfileRoleAvgAggregateInput;

  @Field(() => JobProfileRoleSumAggregateInput, { nullable: true })
  _sum?: JobProfileRoleSumAggregateInput;

  @Field(() => JobProfileRoleMinAggregateInput, { nullable: true })
  _min?: JobProfileRoleMinAggregateInput;

  @Field(() => JobProfileRoleMaxAggregateInput, { nullable: true })
  _max?: JobProfileRoleMaxAggregateInput;
}
