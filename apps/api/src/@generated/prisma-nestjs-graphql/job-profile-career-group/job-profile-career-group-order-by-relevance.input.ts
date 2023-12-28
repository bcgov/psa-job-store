import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCareerGroupOrderByRelevanceFieldEnum } from './job-profile-career-group-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class JobProfileCareerGroupOrderByRelevanceInput {
  @Field(() => [JobProfileCareerGroupOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileCareerGroupOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
