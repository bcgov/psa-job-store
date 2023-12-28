import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileStreamOrderByRelevanceFieldEnum } from './job-profile-stream-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileStreamOrderByRelevanceInput {
  @Field(() => [JobProfileStreamOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileStreamOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
