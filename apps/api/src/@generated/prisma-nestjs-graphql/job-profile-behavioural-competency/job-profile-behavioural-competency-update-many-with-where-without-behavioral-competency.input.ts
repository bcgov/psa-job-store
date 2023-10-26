import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyScalarWhereInput } from './job-profile-behavioural-competency-scalar-where.input';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyInput } from './job-profile-behavioural-competency-unchecked-update-many-without-behavioral-competency.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutBehavioral_competencyInput {
  @Field(() => JobProfileBehaviouralCompetencyScalarWhereInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyScalarWhereInput)
  where!: JobProfileBehaviouralCompetencyScalarWhereInput;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyInput)
  data!: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutBehavioral_competencyInput;
}
