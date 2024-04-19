import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutDepartmentsInput } from './organization-create-without-departments.input';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateOrConnectWithoutDepartmentsInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => OrganizationCreateWithoutDepartmentsInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutDepartmentsInput)
  create!: OrganizationCreateWithoutDepartmentsInput;
}
