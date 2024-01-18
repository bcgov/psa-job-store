import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileScopeOrderByRelevanceFieldEnum } from './job-profile-scope-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileScopeOrderByRelevanceInput {
  @Field(() => [JobProfileScopeOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileScopeOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
