import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationOrderByWithAggregationInput } from './organization-order-by-with-aggregation.input';
import { OrganizationScalarFieldEnum } from './organization-scalar-field.enum';
import { OrganizationScalarWhereWithAggregatesInput } from './organization-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { OrganizationCountAggregateInput } from './organization-count-aggregate.input';
import { OrganizationMinAggregateInput } from './organization-min-aggregate.input';
import { OrganizationMaxAggregateInput } from './organization-max-aggregate.input';

@ArgsType()
export class OrganizationGroupByArgs {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => [OrganizationOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<OrganizationOrderByWithAggregationInput>;

  @Field(() => [OrganizationScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof OrganizationScalarFieldEnum>;

  @Field(() => OrganizationScalarWhereWithAggregatesInput, { nullable: true })
  having?: OrganizationScalarWhereWithAggregatesInput;

  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  skip?: number;

  @Field(() => OrganizationCountAggregateInput, { nullable: true })
  _count?: OrganizationCountAggregateInput;

  @Field(() => OrganizationMinAggregateInput, { nullable: true })
  _min?: OrganizationMinAggregateInput;

  @Field(() => OrganizationMaxAggregateInput, { nullable: true })
  _max?: OrganizationMaxAggregateInput;
}
