import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateWithoutJob_profilesInput } from './behavioural-competency-create-without-job-profiles.input';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';

@InputType()
export class BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: false })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  where!: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => BehaviouralCompetencyCreateWithoutJob_profilesInput, { nullable: false })
  @Type(() => BehaviouralCompetencyCreateWithoutJob_profilesInput)
  create!: BehaviouralCompetencyCreateWithoutJob_profilesInput;
}
