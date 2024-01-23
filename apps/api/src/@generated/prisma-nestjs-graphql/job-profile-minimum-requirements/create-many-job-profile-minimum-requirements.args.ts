import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileMinimumRequirementsCreateManyInput } from './job-profile-minimum-requirements-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyJobProfileMinimumRequirementsArgs {
  @Field(() => [JobProfileMinimumRequirementsCreateManyInput], { nullable: false })
  @Type(() => JobProfileMinimumRequirementsCreateManyInput)
  data!: Array<JobProfileMinimumRequirementsCreateManyInput>;

  @Field(() => Boolean, { nullable: true })
  skipDuplicates?: boolean;
}
