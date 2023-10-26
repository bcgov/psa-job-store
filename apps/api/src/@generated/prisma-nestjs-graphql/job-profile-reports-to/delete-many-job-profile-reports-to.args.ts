import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { JobProfileReportsToWhereInput } from './job-profile-reports-to-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyJobProfileReportsToArgs {
  @Field(() => JobProfileReportsToWhereInput, { nullable: true })
  @Type(() => JobProfileReportsToWhereInput)
  where?: JobProfileReportsToWhereInput;
}
