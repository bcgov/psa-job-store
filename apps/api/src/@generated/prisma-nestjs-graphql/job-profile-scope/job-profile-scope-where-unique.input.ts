import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileScopeWhereInput } from './job-profile-scope-where.input';

@InputType()
export class JobProfileScopeWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobProfileScopeWhereInput], { nullable: true })
  AND?: Array<JobProfileScopeWhereInput>;

  @Field(() => [JobProfileScopeWhereInput], { nullable: true })
  OR?: Array<JobProfileScopeWhereInput>;

  @Field(() => [JobProfileScopeWhereInput], { nullable: true })
  NOT?: Array<JobProfileScopeWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  description?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
