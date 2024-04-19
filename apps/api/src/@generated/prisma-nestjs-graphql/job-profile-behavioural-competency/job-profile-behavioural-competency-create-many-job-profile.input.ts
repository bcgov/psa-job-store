import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyJob_profileInput {
  @Field(() => Int, { nullable: false })
  behavioural_competency_id!: number;
}
