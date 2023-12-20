import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';

@InputType()
export class JobProfileBehaviouralCompetencyListRelationFilter {
  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  every?: JobProfileBehaviouralCompetencyWhereInput;

  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  some?: JobProfileBehaviouralCompetencyWhereInput;

  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  none?: JobProfileBehaviouralCompetencyWhereInput;
}
