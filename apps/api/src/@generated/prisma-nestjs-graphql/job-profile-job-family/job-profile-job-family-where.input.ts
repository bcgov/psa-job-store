import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { JobProfileStreamListRelationFilter } from '../job-profile-stream/job-profile-stream-list-relation-filter.input';

@InputType()
export class JobProfileJobFamilyWhereInput {
  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  AND?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  OR?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => [JobProfileJobFamilyWhereInput], { nullable: true })
  NOT?: Array<JobProfileJobFamilyWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;

  @Field(() => JobProfileStreamListRelationFilter, { nullable: true })
  JobProfileStream?: JobProfileStreamListRelationFilter;
}
