import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobCategoryWhereInput } from './job-category-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobCategoryWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobCategoryWhereInput], { nullable: true })
  AND?: Array<JobCategoryWhereInput>;

  @Field(() => [JobCategoryWhereInput], { nullable: true })
  OR?: Array<JobCategoryWhereInput>;

  @Field(() => [JobCategoryWhereInput], { nullable: true })
  NOT?: Array<JobCategoryWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  profiles?: JobProfileListRelationFilter;
}
