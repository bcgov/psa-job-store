import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { JobProfileCreateWithoutBehavioural_competenciesInput } from './job-profile-create-without-behavioural-competencies.input';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutBehavioural_competenciesInput } from './job-profile-create-or-connect-without-behavioural-competencies.input';
import { JobProfileUpsertWithoutBehavioural_competenciesInput } from './job-profile-upsert-without-behavioural-competencies.input';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { JobProfileUpdateToOneWithWhereWithoutBehavioural_competenciesInput } from './job-profile-update-to-one-with-where-without-behavioural-competencies.input';

@InputType()
export class JobProfileUpdateOneRequiredWithoutBehavioural_competenciesNestedInput {
  @Field(() => JobProfileCreateWithoutBehavioural_competenciesInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutBehavioural_competenciesInput)
  create?: JobProfileCreateWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileCreateOrConnectWithoutBehavioural_competenciesInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutBehavioural_competenciesInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileUpsertWithoutBehavioural_competenciesInput, { nullable: true })
  @Type(() => JobProfileUpsertWithoutBehavioural_competenciesInput)
  upsert?: JobProfileUpsertWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id'>;

  @Field(() => JobProfileUpdateToOneWithWhereWithoutBehavioural_competenciesInput, { nullable: true })
  @Type(() => JobProfileUpdateToOneWithWhereWithoutBehavioural_competenciesInput)
  update?: JobProfileUpdateToOneWithWhereWithoutBehavioural_competenciesInput;
}
