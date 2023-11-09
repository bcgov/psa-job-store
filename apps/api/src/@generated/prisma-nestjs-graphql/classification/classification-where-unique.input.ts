import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { ClassificationWhereInput } from './classification-where.input';
import { IntFilter } from '../prisma/int-filter.input';
import { GridRelationFilter } from '../grid/grid-relation-filter.input';
import { OccupationGroupRelationFilter } from '../occupation-group/occupation-group-relation-filter.input';
import { JobProfileListRelationFilter } from '../job-profile/job-profile-list-relation-filter.input';
import { JobProfileReportsToListRelationFilter } from '../job-profile-reports-to/job-profile-reports-to-list-relation-filter.input';

@InputType()
export class ClassificationWhereUniqueInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => [ClassificationWhereInput], { nullable: true })
  AND?: Array<ClassificationWhereInput>;

  @Field(() => [ClassificationWhereInput], { nullable: true })
  OR?: Array<ClassificationWhereInput>;

  @Field(() => [ClassificationWhereInput], { nullable: true })
  NOT?: Array<ClassificationWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  grid_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  occupation_group_id?: IntFilter;

  @Field(() => GridRelationFilter, { nullable: true })
  grid?: GridRelationFilter;

  @Field(() => OccupationGroupRelationFilter, { nullable: true })
  occupation_group?: OccupationGroupRelationFilter;

  @Field(() => JobProfileListRelationFilter, { nullable: true })
  job_profiles?: JobProfileListRelationFilter;

  @Field(() => JobProfileReportsToListRelationFilter, { nullable: true })
  dependent_job_profiles?: JobProfileReportsToListRelationFilter;
}
