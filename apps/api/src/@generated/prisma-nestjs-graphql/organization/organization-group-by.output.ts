import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { OrganizationCountAggregate } from './organization-count-aggregate.output';
import { OrganizationMinAggregate } from './organization-min-aggregate.output';
import { OrganizationMaxAggregate } from './organization-max-aggregate.output';

@ObjectType()
export class OrganizationGroupBy {
  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => String, { nullable: false })
  peoplesoft_id!: string;

  @Field(() => String, { nullable: false })
  code!: string;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  effective_status!: string;

  @Field(() => Date, { nullable: false })
  effective_date!: Date | string;

  @Field(() => OrganizationCountAggregate, { nullable: true })
  _count?: OrganizationCountAggregate;

  @Field(() => OrganizationMinAggregate, { nullable: true })
  _min?: OrganizationMinAggregate;

  @Field(() => OrganizationMaxAggregate, { nullable: true })
  _max?: OrganizationMaxAggregate;
}
