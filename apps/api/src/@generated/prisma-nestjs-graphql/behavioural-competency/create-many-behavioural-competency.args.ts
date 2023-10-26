import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateManyInput } from './behavioural-competency-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyBehaviouralCompetencyArgs {
  @Field(() => [BehaviouralCompetencyCreateManyInput], { nullable: false })
  @Type(() => BehaviouralCompetencyCreateManyInput)
  data!: Array<BehaviouralCompetencyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
