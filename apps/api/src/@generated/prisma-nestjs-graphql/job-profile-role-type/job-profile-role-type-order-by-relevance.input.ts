import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileRoleTypeOrderByRelevanceFieldEnum } from './job-profile-role-type-order-by-relevance-field.enum';

@InputType()
export class JobProfileRoleTypeOrderByRelevanceInput {
  @Field(() => [JobProfileRoleTypeOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileRoleTypeOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
