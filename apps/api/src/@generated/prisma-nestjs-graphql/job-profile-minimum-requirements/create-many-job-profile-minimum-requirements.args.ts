import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileMinimumRequirementsCreateManyInput } from './job-profile-minimum-requirements-create-many.input';

@ArgsType()
export class CreateManyJobProfileMinimumRequirementsArgs {
  @Field(() => [JobProfileMinimumRequirementsCreateManyInput], { nullable: false })
  @Type(() => JobProfileMinimumRequirementsCreateManyInput)
  data!: Array<JobProfileMinimumRequirementsCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
