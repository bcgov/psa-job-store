import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationOrderByRelevanceFieldEnum } from './organization-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class OrganizationOrderByRelevanceInput {
  @Field(() => [OrganizationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof OrganizationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
