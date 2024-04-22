import { Field, ObjectType } from '@nestjs/graphql';
import { JobProfileRoleAvgAggregate } from './job-profile-role-avg-aggregate.output';
import { JobProfileRoleCountAggregate } from './job-profile-role-count-aggregate.output';
import { JobProfileRoleMaxAggregate } from './job-profile-role-max-aggregate.output';
import { JobProfileRoleMinAggregate } from './job-profile-role-min-aggregate.output';
import { JobProfileRoleSumAggregate } from './job-profile-role-sum-aggregate.output';

@ObjectType()
export class AggregateJobProfileRole {
  @Field(() => JobProfileRoleCountAggregate, { nullable: true })
  _count?: JobProfileRoleCountAggregate;

  @Field(() => JobProfileRoleAvgAggregate, { nullable: true })
  _avg?: JobProfileRoleAvgAggregate;

  @Field(() => JobProfileRoleSumAggregate, { nullable: true })
  _sum?: JobProfileRoleSumAggregate;

  @Field(() => JobProfileRoleMinAggregate, { nullable: true })
  _min?: JobProfileRoleMinAggregate;

  @Field(() => JobProfileRoleMaxAggregate, { nullable: true })
  _max?: JobProfileRoleMaxAggregate;
}
