import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInput } from './job-profile-behavioural-competency-create-many-behavioural-competency.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInputEnvelope {
  @Field(() => [JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInput], { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInput)
  data!: Array<JobProfileBehaviouralCompetencyCreateManyBehavioural_competencyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
