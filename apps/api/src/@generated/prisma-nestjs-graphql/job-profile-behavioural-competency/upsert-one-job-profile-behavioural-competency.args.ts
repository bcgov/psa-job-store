import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateInput } from './job-profile-behavioural-competency-create.input';
import { JobProfileBehaviouralCompetencyUpdateInput } from './job-profile-behavioural-competency-update.input';

@ArgsType()
export class UpsertOneJobProfileBehaviouralCompetencyArgs {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyCreateInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateInput)
  create!: JobProfileBehaviouralCompetencyCreateInput;

  @Field(() => JobProfileBehaviouralCompetencyUpdateInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUpdateInput)
  update!: JobProfileBehaviouralCompetencyUpdateInput;
}
