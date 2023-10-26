import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUpdateWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-update-without-behavioral-competency.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateWithWhereUniqueWithoutBehavioral_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateWithoutBehavioral_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithoutBehavioral_competencyInput)
  data!: JobProfileBehaviouralCompetencyUpdateWithoutBehavioral_competencyInput;
}
