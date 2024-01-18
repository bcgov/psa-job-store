import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleTypeOrderByRelevanceFieldEnum } from './job-profile-role-type-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileRoleTypeOrderByRelevanceInput {
  @Field(() => [JobProfileRoleTypeOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileRoleTypeOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
