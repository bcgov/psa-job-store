import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from './organization-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Int } from '@nestjs/graphql';
import { OrganizationCountAggregateInput } from './organization-count-aggregate.input';
import { OrganizationMinAggregateInput } from './organization-min-aggregate.input';
import { OrganizationMaxAggregateInput } from './organization-max-aggregate.input';

@ArgsType()
export class OrganizationAggregateArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => [OrganizationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<OrganizationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => OrganizationCountAggregateInput, { nullable: true })
  _count?: OrganizationCountAggregateInput;

  @Field(() => OrganizationMinAggregateInput, { nullable: true })
  _min?: OrganizationMinAggregateInput;

  @Field(() => OrganizationMaxAggregateInput, { nullable: true })
  _max?: OrganizationMaxAggregateInput;
}
