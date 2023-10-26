import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInput } from './job-profile-behavioural-competency-create-many-behavioral-competency.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInputEnvelope {
  @Field(() => [JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInput], { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInput)
  data!: Array<JobProfileBehaviouralCompetencyCreateManyBehavioral_competencyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
