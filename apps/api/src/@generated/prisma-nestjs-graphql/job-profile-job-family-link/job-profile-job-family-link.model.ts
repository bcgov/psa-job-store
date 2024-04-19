import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileJobFamily } from '../job-profile-job-family/job-profile-job-family.model';
import { JobProfile } from '../job-profile/job-profile.model';

@ObjectType()
export class JobProfileJobFamilyLink {
  @Field(() => Int, { nullable: false })
  jobProfileId!: number;

  @Field(() => Int, { nullable: false })
  jobFamilyId!: number;

  @Field(() => JobProfile, { nullable: false })
  jobProfile?: JobProfile;

  @Field(() => JobProfileJobFamily, { nullable: false })
  jobFamily?: JobProfileJobFamily;
}
