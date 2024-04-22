import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileStreamOrderByRelevanceFieldEnum } from './job-profile-stream-order-by-relevance-field.enum';

@InputType()
export class JobProfileStreamOrderByRelevanceInput {
  @Field(() => [JobProfileStreamOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileStreamOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
