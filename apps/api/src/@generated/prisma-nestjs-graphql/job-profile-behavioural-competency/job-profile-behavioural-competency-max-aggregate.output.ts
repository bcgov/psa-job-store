import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class JobProfileBehaviouralCompetencyMaxAggregate {
  @Field(() => Int, { nullable: true })
  behavioural_competency_id?: number;

  @Field(() => Int, { nullable: true })
  job_profile_id?: number;
}
