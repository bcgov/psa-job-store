import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-update-many-without-behavioural-competency-nested.input';

@InputType()
export class BehaviouralCompetencyUpdateInput {
  @Field(() => BehaviouralCompetencyType, { nullable: true })
  type?: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  category?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyUpdateManyWithoutBehavioural_competencyNestedInput;
}
