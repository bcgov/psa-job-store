import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutJobProfileOrganizationInput } from './organization-create-or-connect-without-job-profile-organization.input';
import { OrganizationCreateWithoutJobProfileOrganizationInput } from './organization-create-without-job-profile-organization.input';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';

@InputType()
export class OrganizationCreateNestedOneWithoutJobProfileOrganizationInput {
  @Field(() => OrganizationCreateWithoutJobProfileOrganizationInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutJobProfileOrganizationInput)
  create?: OrganizationCreateWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationCreateOrConnectWithoutJobProfileOrganizationInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutJobProfileOrganizationInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id' | 'peoplesoft_id'>;
}
