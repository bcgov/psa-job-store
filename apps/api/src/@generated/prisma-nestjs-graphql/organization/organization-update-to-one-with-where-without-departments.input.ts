import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutDepartmentsInput } from './organization-update-without-departments.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutDepartmentsInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutDepartmentsInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutDepartmentsInput)
  data!: OrganizationUpdateWithoutDepartmentsInput;
}
