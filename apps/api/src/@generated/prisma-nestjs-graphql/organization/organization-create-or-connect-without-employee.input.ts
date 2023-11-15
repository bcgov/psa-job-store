import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutEmployeeInput } from './organization-create-without-employee.input';

@InputType()
export class OrganizationCreateOrConnectWithoutEmployeeInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutEmployeeInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutEmployeeInput)
  create!: OrganizationCreateWithoutEmployeeInput;
}
