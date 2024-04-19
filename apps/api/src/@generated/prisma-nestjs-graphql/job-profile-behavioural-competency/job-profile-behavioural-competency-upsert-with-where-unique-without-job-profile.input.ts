import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput } from './job-profile-behavioural-competency-create-without-job-profile.input';
import { JobProfileBehaviouralCompetencyUpdateWithoutJob_profileInput } from './job-profile-behavioural-competency-update-without-job-profile.input';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

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
