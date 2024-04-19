import { Field, InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { JobProfileCreateOrConnectWithoutBehavioural_competenciesInput } from './job-profile-create-or-connect-without-behavioural-competencies.input';
import { JobProfileCreateWithoutBehavioural_competenciesInput } from './job-profile-create-without-behavioural-competencies.input';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';

@InputType()
export class JobProfileCreateNestedOneWithoutBehavioural_competenciesInput {
  @Field(() => JobProfileCreateWithoutBehavioural_competenciesInput, { nullable: true })
  @Type(() => JobProfileCreateWithoutBehavioural_competenciesInput)
  create?: JobProfileCreateWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileCreateOrConnectWithoutBehavioural_competenciesInput, { nullable: true })
  @Type(() => JobProfileCreateOrConnectWithoutBehavioural_competenciesInput)
  connectOrCreate?: JobProfileCreateOrConnectWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileWhereUniqueInput, { nullable: true })
  @Type(() => JobProfileWhereUniqueInput)
  connect?: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;
}
