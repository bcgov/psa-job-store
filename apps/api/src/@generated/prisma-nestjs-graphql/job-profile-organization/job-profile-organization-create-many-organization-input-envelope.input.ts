import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateManyOrganizationInput } from './job-profile-organization-create-many-organization.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileOrganizationCreateManyOrganizationInputEnvelope {
  @Field(() => [JobProfileOrganizationCreateManyOrganizationInput], { nullable: false })
  @Type(() => JobProfileOrganizationCreateManyOrganizationInput)
  data!: Array<JobProfileOrganizationCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
