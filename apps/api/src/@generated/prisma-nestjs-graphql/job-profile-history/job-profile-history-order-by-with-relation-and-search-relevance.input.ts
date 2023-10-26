import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';

@InputType()
export class JobProfileHistoryOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  job_profile_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  json?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  created_by?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_at?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  updated_by?: keyof typeof SortOrder;

  @Field(() => SortOrderInput, { nullable: true })
  deleted_at?: SortOrderInput;

  @Field(() => SortOrder, { nullable: true })
  deleted_by?: keyof typeof SortOrder;
}
