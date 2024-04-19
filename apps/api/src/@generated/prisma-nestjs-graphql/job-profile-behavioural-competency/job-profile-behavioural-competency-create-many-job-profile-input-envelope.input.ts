import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateManyJob_profileInput } from './job-profile-behavioural-competency-create-many-job-profile.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileBehaviouralCompetencyCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyJob_profileInput)
  data!: Array<JobProfileBehaviouralCompetencyCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
