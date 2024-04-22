import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileAvgAggregate } from './job-profile-avg-aggregate.output';
import { JobProfileCountAggregate } from './job-profile-count-aggregate.output';
import { JobProfileMaxAggregate } from './job-profile-max-aggregate.output';
import { JobProfileMinAggregate } from './job-profile-min-aggregate.output';
import { JobProfileSumAggregate } from './job-profile-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfile {
  @Field(() => JobProfileCountAggregate, { nullable: true })
  _count?: JobProfileCountAggregate;

  @Field(() => JobProfileAvgAggregate, { nullable: true })
  _avg?: JobProfileAvgAggregate;

  @Field(() => JobProfileSumAggregate, { nullable: true })
  _sum?: JobProfileSumAggregate;

  @Field(() => JobProfileMinAggregate, { nullable: true })
  _min?: JobProfileMinAggregate;

  @Field(() => JobProfileMaxAggregate, { nullable: true })
  _max?: JobProfileMaxAggregate;
}
