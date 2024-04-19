import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileReportsToSumOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;
}
