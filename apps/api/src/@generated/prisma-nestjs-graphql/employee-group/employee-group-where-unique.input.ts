import { Field, InputType } from '@nestjs/graphql';
import { ClassificationListRelationFilter } from '../classification/classification-list-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { EmployeeGroupWhereInput } from './employee-group-where.input';

@InputType()
export class EmployeeGroupWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  AND?: Array<EmployeeGroupWhereInput>;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  OR?: Array<EmployeeGroupWhereInput>;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  NOT?: Array<EmployeeGroupWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => ClassificationListRelationFilter, { nullable: true })
  classifications?: ClassificationListRelationFilter;
}
