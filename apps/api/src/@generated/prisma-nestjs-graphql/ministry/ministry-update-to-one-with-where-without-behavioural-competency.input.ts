import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryWhereInput } from './ministry-where.input';
import { Type } from 'class-transformer';
import { MinistryUpdateWithoutBehaviouralCompetencyInput } from './ministry-update-without-behavioural-competency.input';

@InputType()
export class MinistryUpdateToOneWithWhereWithoutBehaviouralCompetencyInput {
  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;

  @Field(() => MinistryUpdateWithoutBehaviouralCompetencyInput, { nullable: false })
  @Type(() => MinistryUpdateWithoutBehaviouralCompetencyInput)
  data!: MinistryUpdateWithoutBehaviouralCompetencyInput;
}
