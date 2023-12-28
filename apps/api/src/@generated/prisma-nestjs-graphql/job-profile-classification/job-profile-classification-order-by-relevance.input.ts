import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileClassificationOrderByRelevanceFieldEnum } from './job-profile-classification-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileClassificationOrderByRelevanceInput {
  @Field(() => [JobProfileClassificationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileClassificationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
