import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutDepartmentsInput } from './organization-update-without-departments.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutDepartmentsInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutDepartmentsInput)
  data!: OrganizationUpdateWithoutDepartmentsInput;
}
