import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileCareerGroupCreateInput } from './job-profile-career-group-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileCareerGroupArgs {
  @Field(() => JobProfileCareerGroupCreateInput, { nullable: false })
  @Type(() => JobProfileCareerGroupCreateInput)
  data!: JobProfileCareerGroupCreateInput;
}
