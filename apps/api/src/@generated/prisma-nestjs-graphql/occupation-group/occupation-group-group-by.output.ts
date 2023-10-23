import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { OccupationGroupCountAggregate } from './occupation-group-count-aggregate.output';
import { OccupationGroupAvgAggregate } from './occupation-group-avg-aggregate.output';
import { OccupationGroupSumAggregate } from './occupation-group-sum-aggregate.output';
import { OccupationGroupMinAggregate } from './occupation-group-min-aggregate.output';
import { OccupationGroupMaxAggregate } from './occupation-group-max-aggregate.output';

@ObjectType()
export class OccupationGroupGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => OccupationGroupCountAggregate, { nullable: true })
  _count?: OccupationGroupCountAggregate;

  @Field(() => OccupationGroupAvgAggregate, { nullable: true })
  _avg?: OccupationGroupAvgAggregate;

  @Field(() => OccupationGroupSumAggregate, { nullable: true })
  _sum?: OccupationGroupSumAggregate;

  @Field(() => OccupationGroupMinAggregate, { nullable: true })
  _min?: OccupationGroupMinAggregate;

  @Field(() => OccupationGroupMaxAggregate, { nullable: true })
  _max?: OccupationGroupMaxAggregate;
}
