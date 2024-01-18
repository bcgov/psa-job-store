import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileAvgOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  career_group_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_family_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  role_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  role_type_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  scope_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  stream_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;
}
