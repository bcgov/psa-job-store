import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileReportsToOrderByRelevanceFieldEnum } from './job-profile-reports-to-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileReportsToOrderByRelevanceInput {
  @Field(() => [JobProfileReportsToOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileReportsToOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
