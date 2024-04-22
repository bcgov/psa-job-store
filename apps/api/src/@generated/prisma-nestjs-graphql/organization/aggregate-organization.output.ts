import { Field, ObjectType } from '@nestjs/graphql';
import { OrganizationCountAggregate } from './organization-count-aggregate.output';
import { OrganizationMaxAggregate } from './organization-max-aggregate.output';
import { OrganizationMinAggregate } from './organization-min-aggregate.output';

@ObjectType()
export class AggregateOrganization {
  @Field(() => OrganizationCountAggregate, { nullable: true })
  _count?: OrganizationCountAggregate;

  @Field(() => OrganizationMinAggregate, { nullable: true })
  _min?: OrganizationMinAggregate;

  @Field(() => OrganizationMaxAggregate, { nullable: true })
  _max?: OrganizationMaxAggregate;
}
