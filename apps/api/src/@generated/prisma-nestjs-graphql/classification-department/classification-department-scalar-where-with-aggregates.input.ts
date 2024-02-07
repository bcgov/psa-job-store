import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';

@InputType()
export class ClassificationDepartmentScalarWhereWithAggregatesInput {
  @Field(() => [ClassificationDepartmentScalarWhereWithAggregatesInput], { nullable: true })
  AND?: Array<ClassificationDepartmentScalarWhereWithAggregatesInput>;

  @Field(() => [ClassificationDepartmentScalarWhereWithAggregatesInput], { nullable: true })
  OR?: Array<ClassificationDepartmentScalarWhereWithAggregatesInput>;

  @Field(() => [ClassificationDepartmentScalarWhereWithAggregatesInput], { nullable: true })
  NOT?: Array<ClassificationDepartmentScalarWhereWithAggregatesInput>;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  classification_id?: StringWithAggregatesFilter;

  @Field(() => StringWithAggregatesFilter, { nullable: true })
  department_id?: StringWithAggregatesFilter;
}
