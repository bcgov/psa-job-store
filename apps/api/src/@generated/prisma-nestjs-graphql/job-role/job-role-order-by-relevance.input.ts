import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobRoleOrderByRelevanceFieldEnum } from './job-role-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobRoleOrderByRelevanceInput {
  @Field(() => [JobRoleOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobRoleOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
