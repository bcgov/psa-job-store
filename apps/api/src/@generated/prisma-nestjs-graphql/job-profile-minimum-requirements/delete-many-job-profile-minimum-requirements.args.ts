import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsWhereInput } from './job-profile-minimum-requirements-where.input';

@ArgsType()
export class DeleteManyJobProfileMinimumRequirementsArgs {
  @Field(() => JobProfileMinimumRequirementsWhereInput, { nullable: true })
  @Type(() => JobProfileMinimumRequirementsWhereInput)
  where?: JobProfileMinimumRequirementsWhereInput;
}
