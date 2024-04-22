import { Field, InputType } from '@nestjs/graphql';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';

@InputType()
export class JobProfileScopeWhereInput {
  @Field(() => [JobProfileScopeWhereInput], { nullable: true })
  AND?: Array<JobProfileScopeWhereInput>;

  @Field(() => [JobProfileScopeWhereInput], { nullable: true })
  OR?: Array<JobProfileScopeWhereInput>;

  @Field(() => [JobProfileScopeWhereInput], { nullable: true })
  NOT?: Array<JobProfileScopeWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
