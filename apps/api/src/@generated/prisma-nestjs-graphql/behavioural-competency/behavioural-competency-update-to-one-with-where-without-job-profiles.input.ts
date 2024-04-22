import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyUpdateWithoutJob_profilesInput } from './behavioural-competency-update-without-job-profiles.input';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';

@InputType()
export class BehaviouralCompetencyUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;

  @Field(() => BehaviouralCompetencyUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateWithoutJob_profilesInput)
  data!: BehaviouralCompetencyUpdateWithoutJob_profilesInput;
}
