import { Field, InputType } from '@nestjs/graphql';
import { DepartmentListRelationFilter } from '../department/department-list-relation-filter.input';
import { PositionRequestListRelationFilter } from '../position-request/position-request-list-relation-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { LocationWhereInput } from './location-where.input';

@InputType()
export class LocationWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [LocationWhereInput], { nullable: true })
  AND?: Array<LocationWhereInput>;

  @Field(() => [LocationWhereInput], { nullable: true })
  OR?: Array<LocationWhereInput>;

  @Field(() => [LocationWhereInput], { nullable: true })
  NOT?: Array<LocationWhereInput>;

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

  @Field(() => DepartmentListRelationFilter, { nullable: true })
  departments?: DepartmentListRelationFilter;

  @Field(() => PositionRequestListRelationFilter, { nullable: true })
  positionRequests?: PositionRequestListRelationFilter;
}
