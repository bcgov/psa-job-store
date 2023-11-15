import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutEmployeesInput } from './organization-create-without-employees.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutEmployeesInput } from './organization-create-or-connect-without-employees.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutEmployeesInput {
  @Field(() => OrganizationCreateWithoutEmployeesInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutEmployeesInput)
  create?: OrganizationCreateWithoutEmployeesInput;

  @Field(() => OrganizationCreateOrConnectWithoutEmployeesInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutEmployeesInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutEmployeesInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;
}
