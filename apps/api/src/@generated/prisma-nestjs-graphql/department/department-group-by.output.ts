import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { DepartmentCountAggregate } from './department-count-aggregate.output';
import { DepartmentMinAggregate } from './department-min-aggregate.output';
import { DepartmentMaxAggregate } from './department-max-aggregate.output';

@ObjectType()
export class DepartmentGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  location_id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => DepartmentCountAggregate, { nullable: true })
  _count?: DepartmentCountAggregate;

  @Field(() => DepartmentMinAggregate, { nullable: true })
  _min?: DepartmentMinAggregate;

  @Field(() => DepartmentMaxAggregate, { nullable: true })
  _max?: DepartmentMaxAggregate;
}
