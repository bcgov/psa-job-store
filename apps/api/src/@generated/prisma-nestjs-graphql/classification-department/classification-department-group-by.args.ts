import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { ClassificationDepartmentWhereInput } from './classification-department-where.input';
import { Type } from 'class-transformer';
import { ClassificationDepartmentOrderByWithAggregationInput } from './classification-department-order-by-with-aggregation.input';
import { ClassificationDepartmentScalarFieldEnum } from './classification-department-scalar-field.enum';
import { ClassificationDepartmentScalarWhereWithAggregatesInput } from './classification-department-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { ClassificationDepartmentCountAggregateInput } from './classification-department-count-aggregate.input';
import { ClassificationDepartmentMinAggregateInput } from './classification-department-min-aggregate.input';
import { ClassificationDepartmentMaxAggregateInput } from './classification-department-max-aggregate.input';

@ArgsType()
export class ClassificationDepartmentGroupByArgs {
  @Field(() => ClassificationDepartmentWhereInput, { nullable: true })
  @Type(() => ClassificationDepartmentWhereInput)
  where?: ClassificationDepartmentWhereInput;

  @Field(() => [ClassificationDepartmentOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ClassificationDepartmentOrderByWithAggregationInput>;

  @Field(() => [ClassificationDepartmentScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof ClassificationDepartmentScalarFieldEnum>;

  @Field(() => ClassificationDepartmentScalarWhereWithAggregatesInput, { nullable: true })
  having?: ClassificationDepartmentScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => ClassificationDepartmentCountAggregateInput, { nullable: true })
  _count?: ClassificationDepartmentCountAggregateInput;

  @Field(() => ClassificationDepartmentMinAggregateInput, { nullable: true })
  _min?: ClassificationDepartmentMinAggregateInput;

  @Field(() => ClassificationDepartmentMaxAggregateInput, { nullable: true })
  _max?: ClassificationDepartmentMaxAggregateInput;
}
