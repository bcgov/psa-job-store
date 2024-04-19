import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileUpdateWithoutBehavioural_competenciesInput } from './job-profile-update-without-behavioural-competencies.input';
import { JobProfileWhereInput } from './job-profile-where.input';

@InputType()
export class JobProfileUpdateToOneWithWhereWithoutBehavioural_competenciesInput {
  @Field(() => JobProfileWhereInput, { nullable: true })
  @Type(() => JobProfileWhereInput)
  where?: JobProfileWhereInput;

  @Field(() => JobProfileUpdateWithoutBehavioural_competenciesInput, { nullable: false })
  @Type(() => JobProfileUpdateWithoutBehavioural_competenciesInput)
  data!: JobProfileUpdateWithoutBehavioural_competenciesInput;
}
