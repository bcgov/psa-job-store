import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileReportsToAvgAggregate } from './job-profile-reports-to-avg-aggregate.output';
import { JobProfileReportsToCountAggregate } from './job-profile-reports-to-count-aggregate.output';
import { JobProfileReportsToMaxAggregate } from './job-profile-reports-to-max-aggregate.output';
import { JobProfileReportsToMinAggregate } from './job-profile-reports-to-min-aggregate.output';
import { JobProfileReportsToSumAggregate } from './job-profile-reports-to-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileReportsTo {
  @Field(() => JobProfileReportsToCountAggregate, { nullable: true })
  _count?: JobProfileReportsToCountAggregate;

  @Field(() => JobProfileReportsToAvgAggregate, { nullable: true })
  _avg?: JobProfileReportsToAvgAggregate;

  @Field(() => JobProfileReportsToSumAggregate, { nullable: true })
  _sum?: JobProfileReportsToSumAggregate;

  @Field(() => JobProfileReportsToMinAggregate, { nullable: true })
  _min?: JobProfileReportsToMinAggregate;

  @Field(() => JobProfileReportsToMaxAggregate, { nullable: true })
  _max?: JobProfileReportsToMaxAggregate;
}
