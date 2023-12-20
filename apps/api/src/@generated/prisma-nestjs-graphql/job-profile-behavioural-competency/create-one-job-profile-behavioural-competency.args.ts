import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateInput } from './job-profile-behavioural-competency-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileBehaviouralCompetencyArgs {
  @Field(() => JobProfileBehaviouralCompetencyCreateInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateInput)
  data!: JobProfileBehaviouralCompetencyCreateInput;
}
