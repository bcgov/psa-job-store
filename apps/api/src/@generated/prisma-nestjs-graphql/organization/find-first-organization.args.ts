import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationOrderByWithRelationAndSearchRelevanceInput } from './organization-order-by-with-relation-and-search-relevance.input';
import { OrganizationScalarFieldEnum } from './organization-scalar-field.enum';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationWhereInput } from './organization-where.input';

@ArgsType()
export class FindFirstOrganizationArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => [OrganizationOrderByWithRelationAndSearchRelevanceInput], { nullable: true })
  orderBy?: Array<OrganizationOrderByWithRelationAndSearchRelevanceInput>;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  cursor?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => [OrganizationScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof OrganizationScalarFieldEnum>;
}
