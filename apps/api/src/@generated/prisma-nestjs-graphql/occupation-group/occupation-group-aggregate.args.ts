import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OccupationGroupWhereInput } from './occupation-group-where.input';
import { Type } from 'class-transformer';
import { OccupationGroupOrderByWithRelationAndSearchRelevanceInput } from './occupation-group-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { OccupationGroupWhereUniqueInput } from './occupation-group-where-unique.input';
import { Int } from '@nestjs/graphql';
import { OccupationGroupCountAggregateInput } from './occupation-group-count-aggregate.input';
import { OccupationGroupAvgAggregateInput } from './occupation-group-avg-aggregate.input';
import { OccupationGroupSumAggregateInput } from './occupation-group-sum-aggregate.input';
import { OccupationGroupMinAggregateInput } from './occupation-group-min-aggregate.input';
import { OccupationGroupMaxAggregateInput } from './occupation-group-max-aggregate.input';

@ArgsType()
export class OccupationGroupAggregateArgs {
  @Field(() => OccupationGroupWhereInput, { nullable: true })
  @Type(() => OccupationGroupWhereInput)
  where?: OccupationGroupWhereInput;

  @Field(() => [OccupationGroupOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<OccupationGroupOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => OccupationGroupWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<OccupationGroupWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => OccupationGroupCountAggregateInput, { nullable: true })
  _count?: OccupationGroupCountAggregateInput;

  @Field(() => OccupationGroupAvgAggregateInput, { nullable: true })
  _avg?: OccupationGroupAvgAggregateInput;

  @Field(() => OccupationGroupSumAggregateInput, { nullable: true })
  _sum?: OccupationGroupSumAggregateInput;

  @Field(() => OccupationGroupMinAggregateInput, { nullable: true })
  _min?: OccupationGroupMinAggregateInput;

  @Field(() => OccupationGroupMaxAggregateInput, { nullable: true })
  _max?: OccupationGroupMaxAggregateInput;
}
