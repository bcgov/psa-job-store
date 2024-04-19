import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyInput } from './job-profile-behavioural-competency-unchecked-update-many.input';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';

@ArgsType()
export class UpdateManyJobProfileBehaviouralCompetencyArgs {
  @Field(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyInput, { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyUncheckedUpdateManyInput)
  data!: JobProfileBehaviouralCompetencyUncheckedUpdateManyInput;

  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereInput)
  where?: JobProfileBehaviouralCompetencyWhereInput;
}
