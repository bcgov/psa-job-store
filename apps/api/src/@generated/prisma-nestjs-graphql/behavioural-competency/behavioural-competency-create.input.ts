import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioural_competencyInput } from '../job-profile-behavioural-competency/job-profile-behavioural-competency-create-nested-many-without-behavioural-competency.input';

@InputType()
export class BehaviouralCompetencyCreateInput {
  @Field(() => BehaviouralCompetencyType, { nullable: false })
  type!: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: false })
  category!: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioural_competencyInput, { nullable: true })
  job_profiles?: JobProfileBehaviouralCompetencyCreateNestedManyWithoutBehavioural_competencyInput;
}
