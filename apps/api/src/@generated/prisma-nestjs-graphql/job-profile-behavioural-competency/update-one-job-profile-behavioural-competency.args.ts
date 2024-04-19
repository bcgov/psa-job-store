import { ArgsType, Field } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUpdateInput } from './job-profile-behavioural-competency-update.input';
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
