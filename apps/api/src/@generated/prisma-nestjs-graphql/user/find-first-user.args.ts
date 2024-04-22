import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { UserOrderByWithRelationAndSearchRelevanceInput } from './user-order-by-with-relation-and-search-relevance.input';
import { UserScalarFieldEnum } from './user-scalar-field.enum';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserWhereInput } from './user-where.input';

@ArgsType()
export class FindFirstUserArgs {
  @Field(() => UserWhereInput, { nullable: true })
  @Type(() => UserWhereInput)
  where?: UserWhereInput;

  @Field(() => [UserOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<UserOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => UserWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [UserScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof UserScalarFieldEnum>;
}
