import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToCreateInput } from './job-profile-reports-to-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToCreateInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateInput)
  data!: JobProfileReportsToCreateInput;
}
