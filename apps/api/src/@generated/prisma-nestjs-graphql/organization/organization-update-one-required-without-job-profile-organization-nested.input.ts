import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationCreateWithoutJobProfileOrganizationInput } from './organization-create-without-job-profile-organization.input';
import { Type } from 'class-transformer';
import { OrganizationCreateOrConnectWithoutJobProfileOrganizationInput } from './organization-create-or-connect-without-job-profile-organization.input';
import { OrganizationUpsertWithoutJobProfileOrganizationInput } from './organization-upsert-without-job-profile-organization.input';
import { Prisma } from '@prisma/client';
import { OrganizationWhereUniqueInput } from './organization-where-unique.input';
import { OrganizationUpdateToOneWithWhereWithoutJobProfileOrganizationInput } from './organization-update-to-one-with-where-without-job-profile-organization.input';

@InputType()
export class OrganizationUpdateOneRequiredWithoutJobProfileOrganizationNestedInput {
  @Field(() => OrganizationCreateWithoutJobProfileOrganizationInput, { nullable: true })
  @Type(() => OrganizationCreateWithoutJobProfileOrganizationInput)
  create?: OrganizationCreateWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationCreateOrConnectWithoutJobProfileOrganizationInput, { nullable: true })
  @Type(() => OrganizationCreateOrConnectWithoutJobProfileOrganizationInput)
  connectOrCreate?: OrganizationCreateOrConnectWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationUpsertWithoutJobProfileOrganizationInput, { nullable: true })
  @Type(() => OrganizationUpsertWithoutJobProfileOrganizationInput)
  upsert?: OrganizationUpsertWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationWhereUniqueInput, { nullable: true })
  @Type(() => OrganizationWhereUniqueInput)
  connect?: Prisma.AtLeast<OrganizationWhereUniqueInput, 'id'>;

  @Field(() => OrganizationUpdateToOneWithWhereWithoutJobProfileOrganizationInput, { nullable: true })
  @Type(() => OrganizationUpdateToOneWithWhereWithoutJobProfileOrganizationInput)
  update?: OrganizationUpdateToOneWithWhereWithoutJobProfileOrganizationInput;
}
