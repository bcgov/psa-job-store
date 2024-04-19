import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateInput } from './job-profile-behavioural-competency-create.input';

@ArgsType()
export class CreateOneJobProfileBehaviouralCompetencyArgs {
  @Field(() => JobProfileBehaviouralCompetencyCreateInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateInput)
  data!: JobProfileBehaviouralCompetencyCreateInput;
}
