import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { BehaviouralCompetencyCreateWithoutJob_profilesInput } from './behavioural-competency-create-without-job-profiles.input';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput } from './behavioural-competency-create-or-connect-without-job-profiles.input';
import { Prisma } from '@prisma/client';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';

@InputType()
export class BehaviouralCompetencyCreateNestedOneWithoutJob_profilesInput {
  @Field(() => BehaviouralCompetencyCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => BehaviouralCompetencyCreateWithoutJob_profilesInput)
  create?: BehaviouralCompetencyCreateWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  connect?: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;
}
