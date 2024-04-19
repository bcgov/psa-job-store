import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileClassificationOrderByRelevanceFieldEnum } from './job-profile-classification-order-by-relevance-field.enum';

@InputType()
export class JobProfileClassificationOrderByRelevanceInput {
  @Field(() => [JobProfileClassificationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileClassificationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
