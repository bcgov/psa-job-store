import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileRoleTypeAvgAggregate } from './job-profile-role-type-avg-aggregate.output';
import { JobProfileRoleTypeCountAggregate } from './job-profile-role-type-count-aggregate.output';
import { JobProfileRoleTypeMaxAggregate } from './job-profile-role-type-max-aggregate.output';
import { JobProfileRoleTypeMinAggregate } from './job-profile-role-type-min-aggregate.output';
import { JobProfileRoleTypeSumAggregate } from './job-profile-role-type-sum-aggregate.output';

@ObjectType()
export class JobProfileRoleTypeGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => JobProfileRoleTypeCountAggregate, { nullable: true })
  _count?: JobProfileRoleTypeCountAggregate;

  @Field(() => JobProfileRoleTypeAvgAggregate, { nullable: true })
  _avg?: JobProfileRoleTypeAvgAggregate;

  @Field(() => JobProfileRoleTypeSumAggregate, { nullable: true })
  _sum?: JobProfileRoleTypeSumAggregate;

  @Field(() => JobProfileRoleTypeMinAggregate, { nullable: true })
  _min?: JobProfileRoleTypeMinAggregate;

  @Field(() => JobProfileRoleTypeMaxAggregate, { nullable: true })
  _max?: JobProfileRoleTypeMaxAggregate;
}
