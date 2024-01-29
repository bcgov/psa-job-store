import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateInput } from './job-profile-organization-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationCreateInput, { nullable: false })
  @Type(() => JobProfileOrganizationCreateInput)
  data!: JobProfileOrganizationCreateInput;
}
