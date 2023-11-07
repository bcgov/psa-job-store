import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateManyInput } from './job-profile-behavioural-competency-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileBehaviouralCompetencyArgs {
  @Field(() => [JobProfileBehaviouralCompetencyCreateManyInput], { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyInput)
  data!: Array<JobProfileBehaviouralCompetencyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
