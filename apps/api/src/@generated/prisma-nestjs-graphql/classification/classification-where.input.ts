import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { EmployeeGroupRelationFilter } from '../employee-group/employee-group-relation-filter.input';
import { JobProfileClassificationListRelationFilter } from '../job-profile-classification/job-profile-classification-list-relation-filter.input';
import { JobProfileReportsToListRelationFilter } from '../job-profile-reports-to/job-profile-reports-to-list-relation-filter.input';

@InputType()
export class ClassificationWhereInput {
  @Field(() => [ClassificationWhereInput], { nullable: true })
  AND?: Array<ClassificationWhereInput>;

  @Field(() => [ClassificationWhereInput], { nullable: true })
  OR?: Array<ClassificationWhereInput>;

  @Field(() => [ClassificationWhereInput], { nullable: true })
  NOT?: Array<ClassificationWhereInput>;

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

  @Field(() => EmployeeGroupRelationFilter, { nullable: true })
  employee_group?: EmployeeGroupRelationFilter;

  @Field(() => JobProfileClassificationListRelationFilter, { nullable: true })
  job_profiles?: JobProfileClassificationListRelationFilter;

  @Field(() => JobProfileReportsToListRelationFilter, { nullable: true })
  reportees?: JobProfileReportsToListRelationFilter;
}
