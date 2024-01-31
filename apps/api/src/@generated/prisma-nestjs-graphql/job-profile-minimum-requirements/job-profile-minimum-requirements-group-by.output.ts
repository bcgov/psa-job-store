import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsCountAggregate } from './job-profile-minimum-requirements-count-aggregate.output';
import { JobProfileMinimumRequirementsAvgAggregate } from './job-profile-minimum-requirements-avg-aggregate.output';
import { JobProfileMinimumRequirementsSumAggregate } from './job-profile-minimum-requirements-sum-aggregate.output';
import { JobProfileMinimumRequirementsMinAggregate } from './job-profile-minimum-requirements-min-aggregate.output';
import { JobProfileMinimumRequirementsMaxAggregate } from './job-profile-minimum-requirements-max-aggregate.output';

@ObjectType()
export class JobProfileMinimumRequirementsGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  requirement!: string;

  @Field(() => String, { nullable: false })
  grade!: string;

  @Field(() => JobProfileMinimumRequirementsCountAggregate, { nullable: true })
  _count?: JobProfileMinimumRequirementsCountAggregate;

  @Field(() => JobProfileMinimumRequirementsAvgAggregate, { nullable: true })
  _avg?: JobProfileMinimumRequirementsAvgAggregate;

  @Field(() => JobProfileMinimumRequirementsSumAggregate, { nullable: true })
  _sum?: JobProfileMinimumRequirementsSumAggregate;

  @Field(() => JobProfileMinimumRequirementsMinAggregate, { nullable: true })
  _min?: JobProfileMinimumRequirementsMinAggregate;

  @Field(() => JobProfileMinimumRequirementsMaxAggregate, { nullable: true })
  _max?: JobProfileMinimumRequirementsMaxAggregate;
}
