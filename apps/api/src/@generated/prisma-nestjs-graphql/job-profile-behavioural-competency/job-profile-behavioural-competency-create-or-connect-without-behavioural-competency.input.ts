import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-create-without-behavioural-competency.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioural_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput)
  create!: JobProfileBehaviouralCompetencyCreateWithoutBehavioural_competencyInput;
}
