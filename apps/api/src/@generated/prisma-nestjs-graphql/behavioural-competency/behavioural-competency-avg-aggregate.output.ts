import { Field, Float, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BehaviouralCompetencyAvgAggregate {
  @Field(() => Float, { nullable: true })
  id?: number;
}
