import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutEmployeesInput } from './organization-create-without-employees.input';

@InputType()
export class OrganizationCreateOrConnectWithoutEmployeesInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutEmployeesInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutEmployeesInput)
  create!: OrganizationCreateWithoutEmployeesInput;
}
