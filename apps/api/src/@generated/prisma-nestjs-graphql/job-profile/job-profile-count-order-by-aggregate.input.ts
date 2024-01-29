import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileCountOrderByAggregateInput {
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
  accountabilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  requirements?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  professional_registration_requirements?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  preferences?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  knowledge_skills_abilities?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  willingness_statements?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  security_screenings?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  total_comp_create_form_misc?: keyof typeof SortOrder;
}
