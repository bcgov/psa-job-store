import { Field, InputType, Int } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-unchecked-create-nested-many-without-behavioural-competency.input';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';

@InputType()
export class BehaviouralCompetencyUncheckedCreateInput {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => BehaviouralCompetencyType, { nullable: false })
  type!: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: false })
  category!: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput, {
    nullable: true,
  })
  job_profiles?: JobProfileBehaviouralCompetencyUncheckedCreateNestedManyWithoutBehavioural_competencyInput;
}
