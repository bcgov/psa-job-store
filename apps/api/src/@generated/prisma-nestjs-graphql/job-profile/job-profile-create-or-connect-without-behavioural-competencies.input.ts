import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { JobProfileWhereUniqueInput } from './job-profile-where-unique.input';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutBehavioural_competenciesInput } from './job-profile-create-without-behavioural-competencies.input';

@InputType()
export class JobProfileCreateOrConnectWithoutBehavioural_competenciesInput {
  @Field(() => JobProfileWhereUniqueInput, { nullable: false })
  @Type(() => JobProfileWhereUniqueInput)
  where!: Prisma.AtLeast<JobProfileWhereUniqueInput, 'id' | 'number'>;

  @Field(() => JobProfileCreateWithoutBehavioural_competenciesInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutBehavioural_competenciesInput)
  create!: JobProfileCreateWithoutBehavioural_competenciesInput;
}
