import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { JobFamilyWhereInput } from './job-family-where.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class JobFamilyWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [JobFamilyWhereInput], { nullable: true })
  AND?: Array<JobFamilyWhereInput>;

  @Field(() => [JobFamilyWhereInput], { nullable: true })
  OR?: Array<JobFamilyWhereInput>;

  @Field(() => [JobFamilyWhereInput], { nullable: true })
  NOT?: Array<JobFamilyWhereInput>;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  profiles?: JobProfileListRelationFilter;
}
