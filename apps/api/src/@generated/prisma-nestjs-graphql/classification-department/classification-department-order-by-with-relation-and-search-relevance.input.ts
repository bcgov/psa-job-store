import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { ClassificationOrderByWithRelationAndSearchRelevanceInput } from '../classification/classification-order-by-with-relation-and-search-relevance.input';
import { DepartmentOrderByWithRelationAndSearchRelevanceInput } from '../department/department-order-by-with-relation-and-search-relevance.input';
import { ClassificationDepartmentOrderByRelevanceInput } from './classification-department-order-by-relevance.input';

@InputType()
export class ClassificationDepartmentOrderByWithRelationAndSearchRelevanceInput {
  @Field(() => SortOrder, { nullable: true })
  classification_id?: keyof typeof SortOrder;

  @Field(() => SortOrder, { nullable: true })
  department_id?: keyof typeof SortOrder;

  @Field(() => ClassificationOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  classification?: ClassificationOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => DepartmentOrderByWithRelationAndSearchRelevanceInput, { nullable: true })
  department?: DepartmentOrderByWithRelationAndSearchRelevanceInput;

  @Field(() => ClassificationDepartmentOrderByRelevanceInput, { nullable: true })
  _relevance?: ClassificationDepartmentOrderByRelevanceInput;
}
