import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileJobFamilyLinkMinOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  jobProfileId?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  jobFamilyId?: keyof typeof SortOrder;
}
