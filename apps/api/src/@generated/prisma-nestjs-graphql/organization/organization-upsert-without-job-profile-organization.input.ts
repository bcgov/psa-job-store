import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationCreateWithoutJobProfileOrganizationInput } from './organization-create-without-job-profile-organization.input';
import { OrganizationUpdateWithoutJobProfileOrganizationInput } from './organization-update-without-job-profile-organization.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpsertWithoutJobProfileOrganizationInput {
  @Field(() => OrganizationUpdateWithoutJobProfileOrganizationInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJobProfileOrganizationInput)
  update!: OrganizationUpdateWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationCreateWithoutJobProfileOrganizationInput, { nullable: false })
  @Type(() => OrganizationCreateWithoutJobProfileOrganizationInput)
  create!: OrganizationCreateWithoutJobProfileOrganizationInput;

  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;
}
