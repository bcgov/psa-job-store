import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileRoleOrderByRelevanceFieldEnum } from './job-profile-role-order-by-relevance-field.enum';

@InputType()
export class JobProfileRoleOrderByRelevanceInput {
  @Field(() => [JobProfileRoleOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileRoleOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
