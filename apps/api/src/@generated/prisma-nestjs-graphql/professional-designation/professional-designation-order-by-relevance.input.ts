import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ProfessionalDesignationOrderByRelevanceFieldEnum } from './professional-designation-order-by-relevance-field.enum';
import { SortOrder } from '../prisma/sort-order.enum';

@InputType()
export class ProfessionalDesignationOrderByRelevanceInput {
  @Field(() => [ProfessionalDesignationOrderByRelevanceFieldEnum], { nullable: false })
  fields!: Array<keyof typeof ProfessionalDesignationOrderByRelevanceFieldEnum>;

  @Field(() => SortOrder, { nullable: false })
  sort!: keyof typeof SortOrder;

  @Field(() => String, { nullable: false })
  search!: string;
}
