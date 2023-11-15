import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationUpdateWithoutEmployeeInput } from './organization-update-without-employee.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutEmployeeInput } from './organization-create-without-employee.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutEmployeeInput {
  @Field(() => OrganizationUpdateWithoutEmployeeInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutEmployeeInput)
  update!: OrganizationUpdateWithoutEmployeeInput;

  @Field(() => OrganizationCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutEmployeeInput)
  create!: OrganizationCreateWithoutEmployeeInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
