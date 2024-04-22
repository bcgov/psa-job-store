import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileMaxOrderByAggregateInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  all_organizations?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  all_reports_to?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  role_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  role_type_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  scope_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  state?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  type?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  owner_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  program_overview?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  review_required?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  title?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  number?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  overview?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  is_archived?: keyof typeof SortOrder;
}
