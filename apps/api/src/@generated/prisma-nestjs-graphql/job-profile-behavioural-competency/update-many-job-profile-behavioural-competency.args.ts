import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyUncheckedUpdateManyInput } from './job-profile-behavioural-competency-unchecked-update-many.input';
import { Type } from 'class-transformer';
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
