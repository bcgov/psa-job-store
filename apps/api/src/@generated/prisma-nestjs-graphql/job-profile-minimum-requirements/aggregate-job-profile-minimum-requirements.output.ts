import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsAvgAggregate } from './job-profile-minimum-requirements-avg-aggregate.output';
import { JobProfileMinimumRequirementsCountAggregate } from './job-profile-minimum-requirements-count-aggregate.output';
import { JobProfileMinimumRequirementsMaxAggregate } from './job-profile-minimum-requirements-max-aggregate.output';
import { JobProfileMinimumRequirementsMinAggregate } from './job-profile-minimum-requirements-min-aggregate.output';
import { JobProfileMinimumRequirementsSumAggregate } from './job-profile-minimum-requirements-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileMinimumRequirements {
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
