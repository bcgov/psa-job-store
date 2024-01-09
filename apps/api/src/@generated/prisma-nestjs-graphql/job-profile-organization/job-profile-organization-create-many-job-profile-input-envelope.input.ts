import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileOrganizationCreateManyJob_profileInput } from './job-profile-organization-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileOrganizationCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileOrganizationCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileOrganizationCreateManyJob_profileInput)
  data!: Array<JobProfileOrganizationCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
