import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateWithoutJob_profilesInput } from './behavioural-competency-create-without-job-profiles.input';
import { BehaviouralCompetencyUpdateWithoutJob_profilesInput } from './behavioural-competency-update-without-job-profiles.input';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@InputType()
export class BehaviouralCompetencyUpsertWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateWithoutJob_profilesInput)
  update!: BehaviouralCompetencyUpdateWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateWithoutJob_profilesInput)
  create!: BehaviouralCompetencyCreateWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;
}
