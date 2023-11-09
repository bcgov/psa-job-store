import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobFamilyOrderByRelevanceFieldEnum } from './job-family-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobFamilyOrderByRelevanceInput {
  @Field(() => [JobFamilyOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobFamilyOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
