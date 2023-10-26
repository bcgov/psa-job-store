import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';

@InputType()
export class JobProfileBehaviouralCompetencyScalarWhereInput {
  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereInput], { nullable: true })
  AND?: Array<JobProfileBehaviouralCompetencyScalarWhereInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereInput], { nullable: true })
  OR?: Array<JobProfileBehaviouralCompetencyScalarWhereInput>;

  @Field(() => [JobProfileBehaviouralCompetencyScalarWhereInput], { nullable: true })
  NOT?: Array<JobProfileBehaviouralCompetencyScalarWhereInput>;

  @Field(() => IntFilter, { nullable: true })
  behavioural_competency_id?: IntFilter;

  @Field(() => IntFilter, { nullable: true })
  job_profile_id?: IntFilter;
}
