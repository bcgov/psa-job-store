import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class DepartmentScalarWhereInput {
  @Field(() => [DepartmentScalarWhereInput], { nullable: true })
  AND?: Array<DepartmentScalarWhereInput>;

  @Field(() => [DepartmentScalarWhereInput], { nullable: true })
  OR?: Array<DepartmentScalarWhereInput>;

  @Field(() => [DepartmentScalarWhereInput], { nullable: true })
  NOT?: Array<DepartmentScalarWhereInput>;

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
}
