import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateManyOrganizationInput } from './job-profile-organization-create-many-organization.input';

@InputType()
export class JobProfileOrganizationCreateManyOrganizationInputEnvelope {
  @Field(() => [JobProfileOrganizationCreateManyOrganizationInput], { nullable: false })
  @Type(() => JobProfileOrganizationCreateManyOrganizationInput)
  data!: Array<JobProfileOrganizationCreateManyOrganizationInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
