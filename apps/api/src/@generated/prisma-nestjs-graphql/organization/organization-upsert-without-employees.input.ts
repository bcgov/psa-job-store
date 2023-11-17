import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateWithoutEmployeesInput } from './organization-update-without-employees.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutEmployeesInput } from './organization-create-without-employees.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutEmployeesInput {
  @Field(() => OrganizationUpdateWithoutEmployeesInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutEmployeesInput)
  update!: OrganizationUpdateWithoutEmployeesInput;

  @Field(() => OrganizationCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutEmployeesInput)
  create!: OrganizationCreateWithoutEmployeesInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
