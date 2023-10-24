import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';

@InputType()
export class MinistryWhereInput {
  @Field(() => [MinistryWhereInput], { nullable: true })
  AND?: Array<MinistryWhereInput>;

  @Field(() => [MinistryWhereInput], { nullable: true })
  OR?: Array<MinistryWhereInput>;

  @Field(() => [MinistryWhereInput], { nullable: true })
  NOT?: Array<MinistryWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  id?: IntFilter;

  @Field(() => StringFilter, { nullable: true })
  code?: StringFilter;

  @Field(() => StringFilter, { nullable: true })
  name?: StringFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;
}
