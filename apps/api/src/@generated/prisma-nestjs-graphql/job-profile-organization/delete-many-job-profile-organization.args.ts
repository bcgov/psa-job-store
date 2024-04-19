import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';

@ArgsType()
export class DeleteManyJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  @Type(() => JobProfileOrganizationWhereInput)
  where?: JobProfileOrganizationWhereInput;
}
