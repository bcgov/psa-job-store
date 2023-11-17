import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { PositionCountAggregate } from './position-count-aggregate.output';
import { PositionMinAggregate } from './position-min-aggregate.output';
import { PositionMaxAggregate } from './position-max-aggregate.output';

@ObjectType()
export class PositionGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  classification_id!: string;

  @Field(() => String, { nullable: false })
  department_id!: string;

  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => String, { nullable: false })
  supervisor_id!: string;

  @Field(() => String, { nullable: false })
  title!: string;

  @Field(() => String, { nullable: true })
  job_profile_number?: string;

  @Field(() => Boolean, { nullable: false })
  is_empty!: boolean;

  @Field(() => Boolean, { nullable: false })
  is_vacant!: boolean;

  @Field(() => PositionCountAggregate, { nullable: true })
  _count?: PositionCountAggregate;

  @Field(() => PositionMinAggregate, { nullable: true })
  _min?: PositionMinAggregate;

  @Field(() => PositionMaxAggregate, { nullable: true })
  _max?: PositionMaxAggregate;
}
