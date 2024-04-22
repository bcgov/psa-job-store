import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsCreateInput } from './job-profile-minimum-requirements-create.input';

@ArgsType()
export class CreateOneJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsCreateInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsCreateInput)
  data!: JobProfileMinimumRequirementsCreateInput;
}
