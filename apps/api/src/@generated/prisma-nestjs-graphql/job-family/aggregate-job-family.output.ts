import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobFamilyCountAggregate } from './job-family-count-aggregate.output';
import { JobFamilyAvgAggregate } from './job-family-avg-aggregate.output';
import { JobFamilySumAggregate } from './job-family-sum-aggregate.output';
import { JobFamilyMinAggregate } from './job-family-min-aggregate.output';
import { JobFamilyMaxAggregate } from './job-family-max-aggregate.output';

@ObjectType()
export class AggregateJobFamily {
  @Field(() => JobFamilyCountAggregate, { nullable: true })
  _count?: JobFamilyCountAggregate;

  @Field(() => JobFamilyAvgAggregate, { nullable: true })
  _avg?: JobFamilyAvgAggregate;

  @Field(() => JobFamilySumAggregate, { nullable: true })
  _sum?: JobFamilySumAggregate;

  @Field(() => JobFamilyMinAggregate, { nullable: true })
  _min?: JobFamilyMinAggregate;

  @Field(() => JobFamilyMaxAggregate, { nullable: true })
  _max?: JobFamilyMaxAggregate;
}
