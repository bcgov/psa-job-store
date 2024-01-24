import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { EmployeeGroupCountAggregate } from './employee-group-count-aggregate.output';
import { EmployeeGroupMinAggregate } from './employee-group-min-aggregate.output';
import { EmployeeGroupMaxAggregate } from './employee-group-max-aggregate.output';

@ObjectType()
export class AggregateEmployeeGroup {
  @Field(() => EmployeeGroupCountAggregate, { nullable: true })
  _count?: EmployeeGroupCountAggregate;

  @Field(() => EmployeeGroupMinAggregate, { nullable: true })
  _min?: EmployeeGroupMinAggregate;

  @Field(() => EmployeeGroupMaxAggregate, { nullable: true })
  _max?: EmployeeGroupMaxAggregate;
}
