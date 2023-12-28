import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';

@InputType()
export class BehaviouralCompetencyUpdateWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyType, { nullable: true })
  type?: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  category?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
