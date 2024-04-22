import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateManyInput } from './job-profile-behavioural-competency-create-many.input';

@ArgsType()
export class CreateManyJobProfileBehaviouralCompetencyArgs {
  @Field(() => [JobProfileBehaviouralCompetencyCreateManyInput], { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyInput)
  data!: Array<JobProfileBehaviouralCompetencyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
