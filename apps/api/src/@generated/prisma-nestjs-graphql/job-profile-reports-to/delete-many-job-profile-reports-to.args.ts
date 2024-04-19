import { ArgsType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';

@ArgsType()
export class DeleteManyJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  @Type(() => JobProfileReportsToWhereInput)
  where?: JobProfileReportsToWhereInput;
}
