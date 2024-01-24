import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileContextOrderByRelevanceFieldEnum } from './job-profile-context-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileContextOrderByRelevanceInput {
  @Field(() => [JobProfileContextOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileContextOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
