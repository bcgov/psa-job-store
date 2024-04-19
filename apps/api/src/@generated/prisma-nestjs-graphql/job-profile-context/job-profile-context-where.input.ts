import { Field, InputType } from '@nestjs/graphql';
import { JobProfileRelationFilter } from '../job-profile/job-profile-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileContextWhereInput {
  @Field(() => [JobProfileContextWhereInput], { nullable: true })
  AND?: Array<JobProfileContextWhereInput>;

  @Field(() => [JobProfileContextWhereInput], { nullable: true })
  OR?: Array<JobProfileContextWhereInput>;

  @Field(() => [JobProfileContextWhereInput], { nullable: true })
  NOT?: Array<JobProfileContextWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => JobProfileRelationFilter, { nullable: true })
  job_profile?: JobProfileRelationFilter;
}
