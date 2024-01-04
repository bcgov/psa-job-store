import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { DepartmentListRelationFilter } from '../department/department-list-relation-filter.input';

@InputType()
export class LocationWhereInput {
  @Field(() => [LocationWhereInput], { nullable: true })
  AND?: Array<LocationWhereInput>;

  @Field(() => [LocationWhereInput], { nullable: true })
  OR?: Array<LocationWhereInput>;

  @Field(() => [LocationWhereInput], { nullable: true })
  NOT?: Array<LocationWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

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
}
