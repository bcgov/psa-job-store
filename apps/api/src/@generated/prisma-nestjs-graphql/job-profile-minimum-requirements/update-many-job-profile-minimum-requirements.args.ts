import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsUpdateManyMutationInput } from './job-profile-minimum-requirements-update-many-mutation.input';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';

@ArgsType()
export class UpdateManyJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsUpdateManyMutationInput, { nullable: false })
  @Type(() => JobProfileMinimumRequirementsUpdateManyMutationInput)
  data!: JobProfileMinimumRequirementsUpdateManyMutationInput;

  @Field(() => JobProfileMinimumRequirementsWhereInput, { nullable: true })
  @Type(() => JobProfileMinimumRequirementsWhereInput)
  where?: JobProfileMinimumRequirementsWhereInput;
}
