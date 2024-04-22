import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput } from '../behavioural-competency/behavioural-competency-update-one-required-without-job-profiles-nested.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateWithoutJob_profileInput {
  @Field(() => BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput, { nullable: true })
  behavioural_competency?: BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput;
}
