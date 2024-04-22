import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileContextOrderByRelevanceFieldEnum } from './job-profile-context-order-by-relevance-field.enum';

@InputType()
export class JobProfileContextOrderByRelevanceInput {
  @Field(() => [JobProfileContextOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileContextOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
