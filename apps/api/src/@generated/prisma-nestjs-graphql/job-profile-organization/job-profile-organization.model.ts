import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Organization } from '../organization/organization.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileOrganization {
  @Field(() => String, { nullable: false })
  organization_id!: string;

  @Field(() => Int, { nullable: false })
  job_profile_id!: number;

  @Field(() => Organization, { nullable: false })
  organization?: Organization;

  @Field(() => JobProfile, { nullable: false })
  job_profile?: JobProfile;
}
