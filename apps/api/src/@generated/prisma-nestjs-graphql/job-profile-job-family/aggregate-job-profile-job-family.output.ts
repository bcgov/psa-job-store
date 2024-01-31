import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileJobFamilyCountAggregate } from './job-profile-job-family-count-aggregate.output';
import { JobProfileJobFamilyAvgAggregate } from './job-profile-job-family-avg-aggregate.output';
import { JobProfileJobFamilySumAggregate } from './job-profile-job-family-sum-aggregate.output';
import { JobProfileJobFamilyMinAggregate } from './job-profile-job-family-min-aggregate.output';
import { JobProfileJobFamilyMaxAggregate } from './job-profile-job-family-max-aggregate.output';

@ObjectType()
export class AggregateJobProfileJobFamily {
  @Field(() => JobProfileJobFamilyCountAggregate, { nullable: true })
  _count?: JobProfileJobFamilyCountAggregate;

  @Field(() => JobProfileJobFamilyAvgAggregate, { nullable: true })
  _avg?: JobProfileJobFamilyAvgAggregate;

  @Field(() => JobProfileJobFamilySumAggregate, { nullable: true })
  _sum?: JobProfileJobFamilySumAggregate;

  @Field(() => JobProfileJobFamilyMinAggregate, { nullable: true })
  _min?: JobProfileJobFamilyMinAggregate;

  @Field(() => JobProfileJobFamilyMaxAggregate, { nullable: true })
  _max?: JobProfileJobFamilyMaxAggregate;
}
