import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutDepartmentsInput } from './organization-create-without-departments.input';

@InputType()
export class OrganizationCreateOrConnectWithoutDepartmentsInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutDepartmentsInput)
  create!: OrganizationCreateWithoutDepartmentsInput;
}
