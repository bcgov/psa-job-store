import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileOrganizationWhereInput } from './job-profile-organization-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileOrganizationArgs {
  @Field(() => JobProfileOrganizationWhereInput, { nullable: true })
  @Type(() => JobProfileOrganizationWhereInput)
  where?: JobProfileOrganizationWhereInput;
}
