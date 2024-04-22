import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileOrganizationCreateManyJob_profileInput } from './job-profile-organization-create-many-job-profile.input';

@InputType()
export class JobProfileOrganizationCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileOrganizationCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileOrganizationCreateManyJob_profileInput)
  data!: Array<JobProfileOrganizationCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
