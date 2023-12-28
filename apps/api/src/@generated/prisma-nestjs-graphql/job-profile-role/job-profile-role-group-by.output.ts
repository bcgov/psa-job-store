import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobProfileRoleType } from '../prisma/job-profile-role-type.enum';
import { JobProfileRoleCountAggregate } from './job-profile-role-count-aggregate.output';
import { JobProfileRoleAvgAggregate } from './job-profile-role-avg-aggregate.output';
import { JobProfileRoleSumAggregate } from './job-profile-role-sum-aggregate.output';
import { JobProfileRoleMinAggregate } from './job-profile-role-min-aggregate.output';
import { JobProfileRoleMaxAggregate } from './job-profile-role-max-aggregate.output';

@ObjectType()
export class JobProfileRoleGroupBy {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => JobProfileRoleType, { nullable: false })
  type!: keyof typeof JobProfileRoleType;

  @Field(() => String, { nullable: false })
  name!: string;

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
