import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';

@InputType()
export class JobProfileOrganizationListRelationFilter {
  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  every?: JobProfileOrganizationWhereInput;

  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  some?: JobProfileOrganizationWhereInput;

  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  none?: JobProfileOrganizationWhereInput;
}
