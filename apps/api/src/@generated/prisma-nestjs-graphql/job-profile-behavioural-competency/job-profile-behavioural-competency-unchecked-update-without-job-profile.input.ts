import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyUncheckedUpdateWithoutJob_profileInput {
  @Field(() => Int, { nullable: true })
  behavioural_competency_id?: number;
}
