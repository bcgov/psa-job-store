import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileCreateWithoutBehavioural_competenciesInput } from './job-profile-create-without-behavioural-competencies.input';
import { JobProfileUpdateWithoutBehavioural_competenciesInput } from './job-profile-update-without-behavioural-competencies.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpsertWithoutBehavioural_competenciesInput {
  @Field(() => JobProfileUpdateWithoutBehavioural_competenciesInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutBehavioural_competenciesInput)
  update!: JobProfileUpdateWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileCreateWithoutBehavioural_competenciesInput, { nullable: false })
  @Type(() => JobProfileCreateWithoutBehavioural_competenciesInput)
  create!: JobProfileCreateWithoutBehavioural_competenciesInput;

  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;
}
