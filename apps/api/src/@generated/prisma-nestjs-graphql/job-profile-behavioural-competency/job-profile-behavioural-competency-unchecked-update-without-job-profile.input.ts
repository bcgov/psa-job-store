import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyUncheckedUpdateWithoutJob_profileInput {
  @Field(() => Int, { nullable: true })
  behavioural_competency_id?: number;
}
