import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileJobFamilyLinkAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  jobProfileId?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  jobFamilyId?: keyof typeof SortOrder;
}
