import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileJobFamilyLinkAvgAggregate } from './job-profile-job-family-link-avg-aggregate.output';
import { JobProfileJobFamilyLinkCountAggregate } from './job-profile-job-family-link-count-aggregate.output';
import { JobProfileJobFamilyLinkMaxAggregate } from './job-profile-job-family-link-max-aggregate.output';
import { JobProfileJobFamilyLinkMinAggregate } from './job-profile-job-family-link-min-aggregate.output';
import { JobProfileJobFamilyLinkSumAggregate } from './job-profile-job-family-link-sum-aggregate.output';

@ObjectType()
export class JobProfileJobFamilyLinkGroupBy {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;

  @Field(() => JobProfileJobFamilyLinkCountAggregate, { nullable: true })
  _count?: JobProfileJobFamilyLinkCountAggregate;

  @Field(() => JobProfileJobFamilyLinkAvgAggregate, { nullable: true })
  _avg?: JobProfileJobFamilyLinkAvgAggregate;

  @Field(() => JobProfileJobFamilyLinkSumAggregate, { nullable: true })
  _sum?: JobProfileJobFamilyLinkSumAggregate;

  @Field(() => JobProfileJobFamilyLinkMinAggregate, { nullable: true })
  _min?: JobProfileJobFamilyLinkMinAggregate;

  @Field(() => JobProfileJobFamilyLinkMaxAggregate, { nullable: true })
  _max?: JobProfileJobFamilyLinkMaxAggregate;
}
