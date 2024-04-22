import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateManyInput } from './behavioural-competency-create-many.input';

@ArgsType()
export class CreateManyBehaviouralCompetencyArgs {
  @Field(() => [BehaviouralCompetencyCreateManyInput], { nullable: false })
  @Type(() => BehaviouralCompetencyCreateManyInput)
  data!: Array<BehaviouralCompetencyCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
