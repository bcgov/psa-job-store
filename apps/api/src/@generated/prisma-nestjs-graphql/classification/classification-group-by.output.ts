import { Field, ObjectType } from '@nestjs/graphql';
import { ClassificationCountAggregate } from './classification-count-aggregate.output';
import { ClassificationMaxAggregate } from './classification-max-aggregate.output';
import { ClassificationMinAggregate } from './classification-min-aggregate.output';

@ObjectType()
export class ClassificationGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  employee_group_id!: string;

  @Field(() => String, { nullable: false })
  grade!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => ClassificationCountAggregate, { nullable: true })
  _count?: ClassificationCountAggregate;

  @Field(() => ClassificationMinAggregate, { nullable: true })
  _min?: ClassificationMinAggregate;

  @Field(() => ClassificationMaxAggregate, { nullable: true })
  _max?: ClassificationMaxAggregate;
}
