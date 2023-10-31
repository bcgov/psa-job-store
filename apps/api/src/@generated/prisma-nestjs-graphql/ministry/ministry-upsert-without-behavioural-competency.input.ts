import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { MinistryUpdateWithoutBehaviouralCompetencyInput } from './ministry-update-without-behavioural-competency.input';
import { Type } from 'class-transformer';
import { MinistryCreateWithoutBehaviouralCompetencyInput } from './ministry-create-without-behavioural-competency.input';
import { MinistryWhereInput } from './ministry-where.input';

@InputType()
export class MinistryUpsertWithoutBehaviouralCompetencyInput {
  @Field(() => MinistryUpdateWithoutBehaviouralCompetencyInput, { nullable: false })
  @Type(() => MinistryUpdateWithoutBehaviouralCompetencyInput)
  update!: MinistryUpdateWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryCreateWithoutBehaviouralCompetencyInput, { nullable: false })
  @Type(() => MinistryCreateWithoutBehaviouralCompetencyInput)
  create!: MinistryCreateWithoutBehaviouralCompetencyInput;

  @Field(() => MinistryWhereInput, { nullable: true })
  @Type(() => MinistryWhereInput)
  where?: MinistryWhereInput;
}
