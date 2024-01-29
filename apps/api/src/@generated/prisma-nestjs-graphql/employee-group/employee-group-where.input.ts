import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { ClassificationListRelationFilter } from '../classification/classification-list-relation-filter.input';

@InputType()
export class EmployeeGroupWhereInput {
  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  AND?: Array<EmployeeGroupWhereInput>;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  OR?: Array<EmployeeGroupWhereInput>;

  @Field(() => [EmployeeGroupWhereInput], { nullable: true })
  NOT?: Array<EmployeeGroupWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => ClassificationListRelationFilter, { nullable: true })
  classifications?: ClassificationListRelationFilter;
}
