import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { MinistryWhereInput } from './ministry-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class MinistryWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [MinistryWhereInput], { nullable: true })
  AND?: Array<MinistryWhereInput>;

  @Field(() => [MinistryWhereInput], { nullable: true })
  OR?: Array<MinistryWhereInput>;

  @Field(() => [MinistryWhereInput], { nullable: true })
  NOT?: Array<MinistryWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
