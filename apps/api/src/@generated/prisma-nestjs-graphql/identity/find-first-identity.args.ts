import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { IdentityWhereInput } from './identity-where.input';
import { Type } from 'class-transformer';
import { IdentityOrderByWithRelationAndSearchRelevanceInput } from './identity-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { IdentityWhereUniqueInput } from './identity-where-unique.input';
import { Int } from '@nestjs/graphql';
import { IdentityScalarFieldEnum } from './identity-scalar-field.enum';

@ArgsType()
export class FindFirstIdentityArgs {
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

  @Field(() => [IdentityScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof IdentityScalarFieldEnum>;
}
