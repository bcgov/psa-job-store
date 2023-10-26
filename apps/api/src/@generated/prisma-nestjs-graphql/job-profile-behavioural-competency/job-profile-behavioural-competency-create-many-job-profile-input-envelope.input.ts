import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetencyCreateManyJob_profileInput } from './job-profile-behavioural-competency-create-many-job-profile.input';
import { Type } from 'class-transformer';

@InputType()
export class JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope {
  @Field(() => [JobProfileBehaviouralCompetencyCreateManyJob_profileInput], { nullable: false })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyJob_profileInput)
  data!: Array<JobProfileBehaviouralCompetencyCreateManyJob_profileInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
