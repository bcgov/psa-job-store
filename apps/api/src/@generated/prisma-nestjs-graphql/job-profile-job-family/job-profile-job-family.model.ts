import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileJobFamilyLink } from '../job-profile-job-family-link/job-profile-job-family-link.model';
import { JobProfileStream } from '../job-profile-stream/job-profile-stream.model';

@ObjectType()
export class JobProfileJobFamily {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => [JobProfileJobFamilyLink], { nullable: true })
  jobProfiles?: Array<JobProfileJobFamilyLink>;

  @Field(() => [JobProfileStream], { nullable: true })
  JobProfileStream?: Array<JobProfileStream>;
}
