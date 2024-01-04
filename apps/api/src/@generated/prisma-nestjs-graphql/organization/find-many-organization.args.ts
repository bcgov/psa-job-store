import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from './organization-order-by-with-relation-and-search-relevance.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { HideField } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OrganizationScalarFieldEnum } from './organization-scalar-field.enum';

@ArgsType()
export class FindManyOrganizationArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => [OrganizationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<OrganizationOrderByWithRelationAndSearchRelevanceInput>;

  @HideField()
  cursor?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @HideField()
  distinct?: Array<keyof typeof OrganizationScalarFieldEnum>;
}
