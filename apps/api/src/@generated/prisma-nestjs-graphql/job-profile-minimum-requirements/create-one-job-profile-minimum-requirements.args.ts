import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsCreateInput } from './job-profile-minimum-requirements-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsCreateInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsCreateInput)
  data!: JobProfileMinimumRequirementsCreateInput;
}
