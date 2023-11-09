import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileBehaviouralCompetencyAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  behavioural_competency_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;
}
