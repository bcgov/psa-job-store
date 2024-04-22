import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput } from './behavioural-competency-create-or-connect-without-job-profiles.input';
import { BehaviouralCompetencyCreateWithoutJob_profilesInput } from './behavioural-competency-create-without-job-profiles.input';
import { BehaviouralCompetencyUpdateToOneWithWhereWithoutJob_profilesInput } from './behavioural-competency-update-to-one-with-where-without-job-profiles.input';
import { BehaviouralCompetencyUpsertWithoutJob_profilesInput } from './behavioural-competency-upsert-without-job-profiles.input';
import { BehaviouralCompetencyWhereUniqueInput } from './behavioural-competency-where-unique.input';

@InputType()
export class BehaviouralCompetencyUpdateOneRequiredWithoutJob_profilesNestedInput {
  @Field(() => BehaviouralCompetencyCreateWithoutJob_profilesInput, { nullable: true })
  @Type(() => BehaviouralCompetencyCreateWithoutJob_profilesInput)
  create?: BehaviouralCompetencyCreateWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput, { nullable: true })
  @Type(() => BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput)
  connectOrCreate?: BehaviouralCompetencyCreateOrConnectWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyUpsertWithoutJob_profilesInput, { nullable: true })
  @Type(() => BehaviouralCompetencyUpsertWithoutJob_profilesInput)
  upsert?: BehaviouralCompetencyUpsertWithoutJob_profilesInput;

  @Field(() => BehaviouralCompetencyWhereUniqueInput, { nullable: true })
  @Type(() => BehaviouralCompetencyWhereUniqueInput)
  connect?: Prisma.AtLeast<BehaviouralCompetencyWhereUniqueInput, 'id'>;

  @Field(() => BehaviouralCompetencyUpdateToOneWithWhereWithoutJob_profilesInput, { nullable: true })
  @Type(() => BehaviouralCompetencyUpdateToOneWithWhereWithoutJob_profilesInput)
  update?: BehaviouralCompetencyUpdateToOneWithWhereWithoutJob_profilesInput;
}
