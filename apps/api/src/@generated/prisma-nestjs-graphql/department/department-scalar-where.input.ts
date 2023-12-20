import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
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
  organization_id?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;
}
