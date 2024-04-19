import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class BehaviouralCompetencyAvgAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true;
}
