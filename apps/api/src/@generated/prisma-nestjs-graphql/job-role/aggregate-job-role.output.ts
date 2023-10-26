import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobRoleCountAggregate } from './job-role-count-aggregate.output';
import { JobRoleAvgAggregate } from './job-role-avg-aggregate.output';
import { JobRoleSumAggregate } from './job-role-sum-aggregate.output';
import { JobRoleMinAggregate } from './job-role-min-aggregate.output';
import { JobRoleMaxAggregate } from './job-role-max-aggregate.output';

@ObjectType()
export class AggregateJobRole {
  @Field(() => JobRoleCountAggregate, { nullable: true })
  _count?: JobRoleCountAggregate;

  @Field(() => JobRoleAvgAggregate, { nullable: true })
  _avg?: JobRoleAvgAggregate;

  @Field(() => JobRoleSumAggregate, { nullable: true })
  _sum?: JobRoleSumAggregate;

  @Field(() => JobRoleMinAggregate, { nullable: true })
  _min?: JobRoleMinAggregate;

  @Field(() => JobRoleMaxAggregate, { nullable: true })
  _max?: JobRoleMaxAggregate;
}
