import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-create-without-behavioral-competency.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateOrConnectWithoutBehavioral_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput)
  create!: JobProfileBehaviouralCompetencyCreateWithoutBehavioral_competencyInput;
}
