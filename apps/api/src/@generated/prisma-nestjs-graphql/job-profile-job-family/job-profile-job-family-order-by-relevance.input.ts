import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileJobFamilyOrderByRelevanceFieldEnum } from './job-profile-job-family-order-by-relevance-field.enum';

@InputType()
export class JobProfileJobFamilyOrderByRelevanceInput {
  @Field(() => [JobProfileJobFamilyOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileJobFamilyOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
