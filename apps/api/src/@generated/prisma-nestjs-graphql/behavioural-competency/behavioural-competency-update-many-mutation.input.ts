import { Field, InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';

@InputType()
export class BehaviouralCompetencyUpdateManyMutationInput {
  @Field(() => BehaviouralCompetencyType, { nullable: true })
  type?: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  category?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
