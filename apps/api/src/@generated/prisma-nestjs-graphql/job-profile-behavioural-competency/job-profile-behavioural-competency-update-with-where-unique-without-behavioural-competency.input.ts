import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-update-without-behavioural-competency.input';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioural_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput)
  data!: JobProfileBehaviouralCompetencyUpdateWithoutBehavioural_competencyInput;
}
