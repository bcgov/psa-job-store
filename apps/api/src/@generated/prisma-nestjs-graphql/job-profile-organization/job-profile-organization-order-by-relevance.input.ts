import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationOrderByRelevanceFieldEnum } from './job-profile-organization-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileOrganizationOrderByRelevanceInput {
  @Field(() => [JobProfileOrganizationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileOrganizationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
