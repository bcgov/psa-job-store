import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BehaviouralCompetencySumAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
