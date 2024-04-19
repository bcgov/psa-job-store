import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfile } from '../job-profile/job-profile.model';
import { Organization } from '../organization/organization.model';

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
