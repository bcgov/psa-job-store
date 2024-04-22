import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { OrganizationUpdateWithoutJobProfileOrganizationInput } from './organization-update-without-job-profile-organization.input';
import { OrganizationWhereInput } from './organization-where.input';

@InputType()
export class OrganizationUpdateToOneWithWhereWithoutJobProfileOrganizationInput {
  @Field(() => OrganizationWhereInput, { nullable: true })
  @Type(() => OrganizationWhereInput)
  where?: OrganizationWhereInput;

  @Field(() => OrganizationUpdateWithoutJobProfileOrganizationInput, { nullable: false })
  @Type(() => OrganizationUpdateWithoutJobProfileOrganizationInput)
  data!: OrganizationUpdateWithoutJobProfileOrganizationInput;
}
