import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyNestedInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-update-many-without-behavioural-competency-nested.input';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';

@InputType()
export class BehaviouralCompetencyUncheckedUpdateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => BehaviouralCompetencyType, { nullable: true })
  type?: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  category?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyNestedInput, {
    nullable: true,
  })
  job_profiles?: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyNestedInput;
}
