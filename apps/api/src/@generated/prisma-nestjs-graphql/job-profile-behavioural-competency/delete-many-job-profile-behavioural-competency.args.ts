import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyWhereInput } from './job-profile-behavioural-competency-where.input';

@ArgsType()
export class DeleteManyJobProfileBehaviouralCompetencyArgs {
  @Field(() => JobProfileBehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereInput)
  where?: JobProfileBehaviouralCompetencyWhereInput;
}
