import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrderByRelevanceFieldEnum } from './job-profile-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileOrderByRelevanceInput {
  @Field(() => [JobProfileOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
