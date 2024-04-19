import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileOrganizationOrderByRelevanceFieldEnum } from './job-profile-organization-order-by-relevance-field.enum';

@InputType()
export class JobProfileOrganizationOrderByRelevanceInput {
  @Field(() => [JobProfileOrganizationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileOrganizationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
