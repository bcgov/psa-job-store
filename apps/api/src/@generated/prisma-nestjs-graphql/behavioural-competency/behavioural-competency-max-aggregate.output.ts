import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';

@ObjectType()
export class BehaviouralCompetencyMaxAggregate {
  @Field(() => Int, { nullable: true })
  id?: number;

  @Field(() => BehaviouralCompetencyType, { nullable: true })
  type?: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: true })
  category?: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  description?: string;
}
