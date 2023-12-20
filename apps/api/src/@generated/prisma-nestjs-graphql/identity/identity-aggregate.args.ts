import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IdentityWhereInput } from './identity-where.input';
import { Type } from 'class-transformer';
import { IdentityOrderByWithRelationAndSearchRelevanceInput } from './identity-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { IdentityWhereUniqueInput } from './identity-where-unique.input';
import { Int } from '@nestjs/graphql';
import { IdentityCountAggregateInput } from './identity-count-aggregate.input';
import { IdentityMinAggregateInput } from './identity-min-aggregate.input';
import { IdentityMaxAggregateInput } from './identity-max-aggregate.input';

@ArgsType()
export class IdentityAggregateArgs {
  @Field(() => IdentityWhereInput, { nullable: true })
  @Type(() => IdentityWhereInput)
  where?: IdentityWhereInput;

  @Field(() => [IdentityOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<IdentityOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => IdentityWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<IdentityWhereUniqueInput, 'sub_identity_provider'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => IdentityCountAggregateInput, { nullable: true })
  _count?: IdentityCountAggregateInput;

  @Field(() => IdentityMinAggregateInput, { nullable: true })
  _min?: IdentityMinAggregateInput;

  @Field(() => IdentityMaxAggregateInput, { nullable: true })
  _max?: IdentityMaxAggregateInput;
}
