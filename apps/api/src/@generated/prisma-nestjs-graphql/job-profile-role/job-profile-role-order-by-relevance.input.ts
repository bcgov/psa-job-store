import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileRoleOrderByRelevanceFieldEnum } from './job-profile-role-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileRoleOrderByRelevanceInput {
  @Field(() => [JobProfileRoleOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileRoleOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
