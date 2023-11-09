import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUpdateWithoutJob_profileInput } from './job-profile-behavioural-competency-update-without-job-profile.input';
import { JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput } from './job-profile-behavioural-competency-create-without-job-profile.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpsertWithWhereUniqueWithoutJob_profileInput {
  @Field(() => JobProfileBehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>;

  @Field(() => JobProfileBehaviouralCompetencyUpdateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUpdateWithoutJob_profileInput)
  update!: JobProfileBehaviouralCompetencyUpdateWithoutJob_profileInput;

  @Field(() => JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput)
  create!: JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput;
}
