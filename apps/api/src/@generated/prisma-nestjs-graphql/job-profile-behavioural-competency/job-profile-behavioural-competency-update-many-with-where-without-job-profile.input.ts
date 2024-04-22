import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyScalarWhereInput } from './job-profile-behavioural-competency-scalar-where.input';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileInput } from './job-profile-behavioural-competency-unchecked-update-many-without-job-profile.input';

@InputType()
export class JobProfileBehaviouralCompetencyUpdateManyWithWhereWithoutJob_profileInput {
  @Field(() => JobProfileBehaviouralCompetencyScalarWhereInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyScalarWhereInput)
  where!: JobProfileBehaviouralCompetencyScalarWhereInput;

  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileInput)
  data!: JobProfileBehaviouralCompetencyUncheckedUpdateManyWithoutJob_profileInput;
}
