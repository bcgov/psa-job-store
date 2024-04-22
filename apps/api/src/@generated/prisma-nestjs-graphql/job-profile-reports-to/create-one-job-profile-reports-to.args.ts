import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToCreateInput } from './job-profile-reports-to-create.input';

@ArgsType()
export class CreateOneJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToCreateInput, { nullable: false })
  @Type(() => JobProfileReportsToCreateInput)
  data!: JobProfileReportsToCreateInput;
}
