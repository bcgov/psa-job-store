import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { LocationRelationFilter } from '../location/location-relation-filter.input';
import { OrganizationRelationFilter } from '../organization/organization-relation-filter.input';
import { PositionRequestListRelationFilter } from '../position-request/position-request-list-relation-filter.input';

@InputType()
export class DepartmentWhereInput {
  @Field(() => [DepartmentWhereInput], { nullable: true })
  AND?: Array<DepartmentWhereInput>;

  @Field(() => [DepartmentWhereInput], { nullable: true })
  OR?: Array<DepartmentWhereInput>;

  @Field(() => [DepartmentWhereInput], { nullable: true })
  NOT?: Array<DepartmentWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  location_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  organization_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  peoplesoft_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  effective_status?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  effective_date?: DateTimeFilter;

  @Field(() => LocationRelationFilter, { nullable: true })
  location?: LocationRelationFilter;

  @Field(() => OrganizationRelationFilter, { nullable: true })
  organization?: OrganizationRelationFilter;

  @Field(() => PositionRequestListRelationFilter, { nullable: true })
  PositionRequest?: PositionRequestListRelationFilter;
}
