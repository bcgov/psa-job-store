import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutEmployeeInput } from './organization-create-without-employee.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutEmployeeInput } from './organization-create-or-connect-without-employee.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutEmployeeInput {
  @Field(() => OrganizationCreateWithoutEmployeeInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutEmployeeInput)
  create?: OrganizationCreateWithoutEmployeeInput;

  @Field(() => OrganizationCreateOrConnectWithoutEmployeeInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutEmployeeInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutEmployeeInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;
}
