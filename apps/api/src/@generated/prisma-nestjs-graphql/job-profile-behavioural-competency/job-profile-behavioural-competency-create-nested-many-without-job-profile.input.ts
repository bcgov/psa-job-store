import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope } from './job-profile-behavioural-competency-create-many-job-profile-input-envelope.input';
import { JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput } from './job-profile-behavioural-competency-create-or-connect-without-job-profile.input';
import { JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput } from './job-profile-behavioural-competency-create-without-job-profile.input';
import { JobProfileBehaviouralCompetencyWhereUniqueInput } from './job-profile-behavioural-competency-where-unique.input';

@InputType()
export class JobProfileBehaviouralCompetencyCreateNestedManyWithoutJob_profileInput {
  @Field(() => [JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput)
  create?: Array<JobProfileBehaviouralCompetencyCreateWithoutJob_profileInput>;

  @Field(() => [JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput)
  connectOrCreate?: Array<JobProfileBehaviouralCompetencyCreateOrConnectWithoutJob_profileInput>;

  @Field(() => JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope, { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope)
  createMany?: JobProfileBehaviouralCompetencyCreateManyJob_profileInputEnvelope;

  @Field(() => [JobProfileBehaviouralCompetencyWhereUniqueInput], { nullable: true })
  @Type(() => JobProfileBehaviouralCompetencyWhereUniqueInput)
  connect?: Array<
    Prisma.AtLeast<JobProfileBehaviouralCompetencyWhereUniqueInput, 'behavioural_competency_id_job_profile_id'>
  >;
}
