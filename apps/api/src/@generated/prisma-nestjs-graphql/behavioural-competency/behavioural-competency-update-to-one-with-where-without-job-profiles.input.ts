import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyWhereInput } from './behavioural-competency-where.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyUpdateWithoutJob_profilesInput } from './behavioural-competency-update-without-job-profiles.input';

@InputType()
export class BehaviouralCompetencyUpdateToOneWithWhereWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyWhereInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereInput)
  where?: BehaviouralCompetencyWhereInput;

  @Field(() => BehaviouralCompetencyUpdateWithoutJob_profilesInput, { nullable: false })
  @Type(() => BehaviouralCompetencyUpdateWithoutJob_profilesInput)
  data!: BehaviouralCompetencyUpdateWithoutJob_profilesInput;
}
