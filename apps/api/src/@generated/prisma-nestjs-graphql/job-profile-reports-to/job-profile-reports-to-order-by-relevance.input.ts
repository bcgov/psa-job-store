import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileReportsToOrderByRelevanceFieldEnum } from './job-profile-reports-to-order-by-relevance-field.enum';

@InputType()
export class JobProfileReportsToOrderByRelevanceInput {
  @Field(() => [JobProfileReportsToOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileReportsToOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
