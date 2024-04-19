import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { BehaviouralCompetencyOrderByRelevanceFieldEnum } from './behavioural-competency-order-by-relevance-field.enum';

@InputType()
export class BehaviouralCompetencyOrderByRelevanceInput {
  @Field(() => [BehaviouralCompetencyOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof BehaviouralCompetencyOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
