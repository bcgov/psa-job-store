import { Field, Int, ObjectType } from '@nestjs/graphql';
import { JobProfileBehaviouralCompetency } from '../job-profile-behavioural-competency/job-profile-behavioural-competency.model';
import { BehaviouralCompetencyCategory } from '../prisma/behavioural-competency-category.enum';
import { BehaviouralCompetencyType } from '../prisma/behavioural-competency-type.enum';

@ObjectType()
export class BehaviouralCompetency {
  @Field(() => Int, { nullable: false })
  id!: number;

  @Field(() => BehaviouralCompetencyType, { nullable: false })
  type!: keyof typeof BehaviouralCompetencyType;

  @Field(() => BehaviouralCompetencyCategory, { nullable: false })
  category!: keyof typeof BehaviouralCompetencyCategory;

  @Field(() => String, { nullable: false })
  name!: string;

  @Field(() => String, { nullable: false })
  description!: string;

  @Field(() => [JobProfileBehaviouralCompetency], { nullable: true })
  job_profiles?: Array<JobProfileBehaviouralCompetency>;
}
