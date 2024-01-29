import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { LocationCountAggregate } from './location-count-aggregate.output';
import { LocationMinAggregate } from './location-min-aggregate.output';
import { LocationMaxAggregate } from './location-max-aggregate.output';

@ObjectType()
export class LocationGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

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

  @Field(() => LocationCountAggregate, { nullable: true })
  _count?: LocationCountAggregate;

  @Field(() => LocationMinAggregate, { nullable: true })
  _min?: LocationMinAggregate;

  @Field(() => LocationMaxAggregate, { nullable: true })
  _max?: LocationMaxAggregate;
}
