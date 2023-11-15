import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutEmployeeInput } from './organization-update-without-employee.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutEmployeeInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutEmployeeInput)
  data!: OrganizationUpdateWithoutEmployeeInput;
}
