import { Field, InputType } from '@nestjs/graphql';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class ClassificationScalarWhereInput {
  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  AND?: Array<ClassificationScalarWhereInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  OR?: Array<ClassificationScalarWhereInput>;

  @Field(() => [ClassificationScalarWhereInput], { nullable: true })
  NOT?: Array<ClassificationScalarWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  peoplesoft_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  employee_group_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  grade?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  effective_status?: StringFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  effective_date?: DateTimeFilter;
}
