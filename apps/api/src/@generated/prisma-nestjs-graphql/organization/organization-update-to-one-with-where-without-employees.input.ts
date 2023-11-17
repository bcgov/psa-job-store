import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutEmployeesInput } from './organization-update-without-employees.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutEmployeesInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutEmployeesInput)
  data!: OrganizationUpdateWithoutEmployeesInput;
}
