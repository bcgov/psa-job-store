import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyJob_profileInput {
  @Field(() => Int, { nullable: false })
  behavioural_competency_id!: number;
}
