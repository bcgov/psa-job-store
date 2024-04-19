import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutDepartmentsInput } from './organization-create-or-connect-without-departments.input';
import { OrganizationCreateWithoutDepartmentsInput } from './organization-create-without-departments.input';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutDepartmentsInput {
  @Field(() => OrganizationCreateWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutDepartmentsInput)
  create?: OrganizationCreateWithoutDepartmentsInput;

  @Field(() => OrganizationCreateOrConnectWithoutDepartmentsInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutDepartmentsInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutDepartmentsInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;
}
