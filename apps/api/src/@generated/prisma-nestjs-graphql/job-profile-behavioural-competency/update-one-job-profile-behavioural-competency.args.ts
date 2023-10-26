import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUpdateInput } from './job-profile-behavioural-competency-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

@ArgsType()
export class UpdateOneJobProfileBehaviouralCompetencyArgs {
  @Field(() => JobProfileBehaviouralCompetencyUpdateInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUpdateInput)
  data!: JobProfileBehaviouralCompetencyUpdateInput;

  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;
}
