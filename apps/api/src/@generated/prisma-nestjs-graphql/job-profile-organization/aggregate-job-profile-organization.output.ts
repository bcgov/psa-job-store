import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { JobProfileOrganizationCountAggregate } from './job-profile-organization-count-aggregate.output';
import { JobProfileOrganizationAvgAggregate } from './job-profile-organization-avg-aggregate.output';
import { JobProfileOrganizationSumAggregate } from './job-profile-organization-sum-aggregate.output';
import { JobProfileOrganizationMinAggregate } from './job-profile-organization-min-aggregate.output';
import { JobProfileOrganizationMaxAggregate } from './job-profile-organization-max-aggregate.output';

@ObjectType()
export class AggregateJobProfileOrganization {
  @Field(() => JobProfileOrganizationCountAggregate, { nullable: true })
  _count?: JobProfileOrganizationCountAggregate;

  @Field(() => JobProfileOrganizationAvgAggregate, { nullable: true })
  _avg?: JobProfileOrganizationAvgAggregate;

  @Field(() => JobProfileOrganizationSumAggregate, { nullable: true })
  _sum?: JobProfileOrganizationSumAggregate;

  @Field(() => JobProfileOrganizationMinAggregate, { nullable: true })
  _min?: JobProfileOrganizationMinAggregate;

  @Field(() => JobProfileOrganizationMaxAggregate, { nullable: true })
  _max?: JobProfileOrganizationMaxAggregate;
}
