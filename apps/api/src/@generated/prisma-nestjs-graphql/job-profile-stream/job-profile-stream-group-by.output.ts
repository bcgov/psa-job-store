import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileStreamCountAggregate } from './job-profile-stream-count-aggregate.output';
import { JobProfileStreamAvgAggregate } from './job-profile-stream-avg-aggregate.output';
import { JobProfileStreamSumAggregate } from './job-profile-stream-sum-aggregate.output';
import { JobProfileStreamMinAggregate } from './job-profile-stream-min-aggregate.output';
import { JobProfileStreamMaxAggregate } from './job-profile-stream-max-aggregate.output';

@ObjectType()
export class JobProfileStreamGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileStreamCountAggregate, { nullable: true })
  _count?: JobProfileStreamCountAggregate;

  @Field(() => JobProfileStreamAvgAggregate, { nullable: true })
  _avg?: JobProfileStreamAvgAggregate;

  @Field(() => JobProfileStreamSumAggregate, { nullable: true })
  _sum?: JobProfileStreamSumAggregate;

  @Field(() => JobProfileStreamMinAggregate, { nullable: true })
  _min?: JobProfileStreamMinAggregate;

  @Field(() => JobProfileStreamMaxAggregate, { nullable: true })
  _max?: JobProfileStreamMaxAggregate;
}
