import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateManyMinistryInput } from './behavioural-competency-create-many-ministry.input';
import { Type } from 'class-transformer';

@InputType()
export class BehaviouralCompetencyCreateManyMinistryInputEnvelope {
  @Field(() => [BehaviouralCompetencyCreateManyMinistryInput], { nullable: false })
  @Type(() => BehaviouralCompetencyCreateManyMinistryInput)
  data!: Array<BehaviouralCompetencyCreateManyMinistryInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
