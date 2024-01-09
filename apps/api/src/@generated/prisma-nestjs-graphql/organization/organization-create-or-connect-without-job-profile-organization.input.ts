import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutJobProfileOrganizationInput } from './organization-create-without-job-profile-organization.input';

@InputType()
export class OrganizationCreateOrConnectWithoutJobProfileOrganizationInput {
  @Field(() => OrganizationWhereUniqueInput, { nullable: false })
  @Type(() => OrganizationWhereUniqueInput)
  where!: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;

  @Field(() => OrganizationCreateWithoutJobProfileOrganizationInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutJobProfileOrganizationInput)
  create!: OrganizationCreateWithoutJobProfileOrganizationInput;
}
