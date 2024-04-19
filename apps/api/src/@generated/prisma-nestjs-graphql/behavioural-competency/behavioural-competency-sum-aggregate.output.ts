import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BehaviouralCompetencySumAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;
}
