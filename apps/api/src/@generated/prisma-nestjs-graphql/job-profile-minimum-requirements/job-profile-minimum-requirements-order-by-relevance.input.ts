import { Field, InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { JobProfileMinimumRequirementsOrderByRelevanceFieldEnum } from './job-profile-minimum-requirements-order-by-relevance-field.enum';

@InputType()
export class JobProfileMinimumRequirementsOrderByRelevanceInput {
  @Field(() => [JobProfileMinimumRequirementsOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof JobProfileMinimumRequirementsOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
