import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileRoleTypeWhereInput } from './job-profile-role-type-where.input';
import { Type } from 'class-transformer';
import { JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput } from './job-profile-role-type-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { JobProfileRoleTypeWhereUniqueInput } from './job-profile-role-type-where-unique.input';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleTypeCountAggregateInput } from './job-profile-role-type-count-aggregate.input';
import { JobProfileRoleTypeAvgAggregateInput } from './job-profile-role-type-avg-aggregate.input';
import { JobProfileRoleTypeSumAggregateInput } from './job-profile-role-type-sum-aggregate.input';
import { JobProfileRoleTypeMinAggregateInput } from './job-profile-role-type-min-aggregate.input';
import { JobProfileRoleTypeMaxAggregateInput } from './job-profile-role-type-max-aggregate.input';

@ArgsType()
export class JobProfileRoleTypeAggregateArgs {
  @Field(() => JobProfileRoleTypeWhereInput, { nullable: true })
  @Type(() => JobProfileRoleTypeWhereInput)
  where?: JobProfileRoleTypeWhereInput;

  @Field(() => [JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<JobProfileRoleTypeOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => JobProfileRoleTypeWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<JobProfileRoleTypeWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => JobProfileRoleTypeCountAggregateInput, { nullable: true })
  _count?: JobProfileRoleTypeCountAggregateInput;

  @Field(() => JobProfileRoleTypeAvgAggregateInput, { nullable: true })
  _avg?: JobProfileRoleTypeAvgAggregateInput;

  @Field(() => JobProfileRoleTypeSumAggregateInput, { nullable: true })
  _sum?: JobProfileRoleTypeSumAggregateInput;

  @Field(() => JobProfileRoleTypeMinAggregateInput, { nullable: true })
  _min?: JobProfileRoleTypeMinAggregateInput;

  @Field(() => JobProfileRoleTypeMaxAggregateInput, { nullable: true })
  _max?: JobProfileRoleTypeMaxAggregateInput;
}
