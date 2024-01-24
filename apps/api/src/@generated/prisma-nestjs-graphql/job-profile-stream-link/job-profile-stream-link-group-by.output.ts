import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileStreamLinkCountAggregate } from './job-profile-stream-link-count-aggregate.output';
import { JobProfileStreamLinkAvgAggregate } from './job-profile-stream-link-avg-aggregate.output';
import { JobProfileStreamLinkSumAggregate } from './job-profile-stream-link-sum-aggregate.output';
import { JobProfileStreamLinkMinAggregate } from './job-profile-stream-link-min-aggregate.output';
import { JobProfileStreamLinkMaxAggregate } from './job-profile-stream-link-max-aggregate.output';

@ObjectType()
export class JobProfileStreamLinkGroupBy {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  streamId!: number;

  @Field(() => JobProfileStreamLinkCountAggregate, { nullable: true })
  _count?: JobProfileStreamLinkCountAggregate;

  @Field(() => JobProfileStreamLinkAvgAggregate, { nullable: true })
  _avg?: JobProfileStreamLinkAvgAggregate;

  @Field(() => JobProfileStreamLinkSumAggregate, { nullable: true })
  _sum?: JobProfileStreamLinkSumAggregate;

  @Field(() => JobProfileStreamLinkMinAggregate, { nullable: true })
  _min?: JobProfileStreamLinkMinAggregate;

  @Field(() => JobProfileStreamLinkMaxAggregate, { nullable: true })
  _max?: JobProfileStreamLinkMaxAggregate;
}
