import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyScalarWhereInput } from './job-profile-behavioural-competency-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyInput } from './job-profile-behavioural-competency-unchecked-update-many-without-behavioural-competency.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioural_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyScalarWhereInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyScalarWhereInput)
  where!: JobProfileBehaviouralCompetencyScalarWhereInput;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyInput, {
    nullable: false,
  })
  @Type(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyInput)
  data!: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioural_competencyInput;
}
