import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { OrganizationWhereInput } from './organization-where.input';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutJobProfileOrganizationInput } from './organization-update-without-job-profile-organization.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutJobProfileOrganizationInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutJobProfileOrganizationInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJobProfileOrganizationInput)
  data!: OrganizationUpdateWithoutJobProfileOrganizationInput;
}
