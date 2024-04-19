import { Field, Int, ObjectType } from '@nestjs/graphql';
import { GraphQLJSON } from 'graphql-type-json';
import { JobProfileHistoryAvgAggregate } from './job-profile-history-avg-aggregate.output';
import { JobProfileHistoryCountAggregate } from './job-profile-history-count-aggregate.output';
import { JobProfileHistoryMaxAggregate } from './job-profile-history-max-aggregate.output';
import { JobProfileHistoryMinAggregate } from './job-profile-history-min-aggregate.output';
import { JobProfileHistorySumAggregate } from './job-profile-history-sum-aggregate.output';

@ObjectType()
export class JobProfileHistoryGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => GraphQLJSON, { nullable: false })
  json!: any;

  @Field(() => Date, { nullable: false })
  created_at!: Date | string;

  @Field(() => Int, { nullable: false })
  created_by!: number;

  @Field(() => Date, { nullable: false })
  updated_at!: Date | string;

  @Field(() => Int, { nullable: false })
  updated_by!: number;

  @Field(() => Date, { nullable: true })
  deleted_at?: Date | string;

  @Field(() => Int, { nullable: false })
  deleted_by!: number;

  @Field(() => JobProfileHistoryCountAggregate, { nullable: true })
  _count?: JobProfileHistoryCountAggregate;

  @Field(() => JobProfileHistoryAvgAggregate, { nullable: true })
  _avg?: JobProfileHistoryAvgAggregate;

  @Field(() => JobProfileHistorySumAggregate, { nullable: true })
  _sum?: JobProfileHistorySumAggregate;

  @Field(() => JobProfileHistoryMinAggregate, { nullable: true })
  _min?: JobProfileHistoryMinAggregate;

  @Field(() => JobProfileHistoryMaxAggregate, { nullable: true })
  _max?: JobProfileHistoryMaxAggregate;
}
