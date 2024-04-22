import { Field, ObjectType } from '@nestjs/graphql';
import { DepartmentCountAggregate } from './department-count-aggregate.output';
import { DepartmentMaxAggregate } from './department-max-aggregate.output';
import { DepartmentMinAggregate } from './department-min-aggregate.output';

@ObjectType()
export class AggregateDepartment {
  @Field(() => DepartmentCountAggregate, { nullable: true })
  _count?: DepartmentCountAggregate;

  @Field(() => DepartmentMinAggregate, { nullable: true })
  _min?: DepartmentMinAggregate;

  @Field(() => DepartmentMaxAggregate, { nullable: true })
  _max?: DepartmentMaxAggregate;
}
