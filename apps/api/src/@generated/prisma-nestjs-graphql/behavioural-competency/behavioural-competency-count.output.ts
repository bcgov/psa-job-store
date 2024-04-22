import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BehaviouralCompetencyCount {
  @Field(() => Int, { nullable: false })
  job_profiles?: number;
}
