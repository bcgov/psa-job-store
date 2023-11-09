import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Grid } from '../grid/grid.model';
import { OccupationGroup } from '../occupation-group/occupation-group.model';
import { JobProfile } from '../job-profile/job-profile.model';
import { JobProfileReportsTo } from '../job-profile-reports-to/job-profile-reports-to.model';

@ObjectType()
export class Classification {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => Int, { nullable: false })
  grid_id!: number;

  @Field(() => Int, { nullable: false })
  occupation_group_id!: number;

  @Field(() => Grid, { nullable: false })
  grid?: Grid;

  @Field(() => OccupationGroup, { nullable: false })
  occupation_group?: OccupationGroup;

  @Field(() => [JobProfile], { nullable: true })
  job_profiles?: Array<JobProfile>;

  @Field(() => [JobProfileReportsTo], { nullable: true })
  dependent_job_profiles?: Array<JobProfileReportsTo>;
}
