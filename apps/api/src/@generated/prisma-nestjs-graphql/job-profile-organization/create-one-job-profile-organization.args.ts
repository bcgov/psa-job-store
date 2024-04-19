import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateInput } from './job-profile-organization-create.input';

@ArgsType()
export class CreateOneJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationCreateInput, { nullable: false })
  @Type(() => JobProfileOrganizationCreateInput)
  data!: JobProfileOrganizationCreateInput;
}
